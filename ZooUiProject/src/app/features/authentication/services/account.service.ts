import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'src/app/core/constants/urls';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICreatedId } from 'src/app/core/interfaces/createdId.interface';
import { map } from 'rxjs/operators';
import { IUserInfo } from 'src/app/core/interfaces/user-info.interface';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public currentUser: Observable<IUserInfo>;
  private currentUserSubject: BehaviorSubject<IUserInfo>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUserInfo>(this.getTokenValue());
    this.currentUser = this.currentUserSubject.asObservable();
   }

  create(data): Observable<ICreatedId> {
    return this.httpClient.post<ICreatedId>(urls.account, data);
  }

  signIn(data): Observable<any> {
    return this.httpClient.post<any>(urls.accountSignIn, data)
      .pipe(
        map(res => {
          if (res && res.token) {
            localStorage.setItem('token', JSON.stringify(res));
            const userInfo = this.getTokenValue();
            this.currentUserSubject.next(userInfo);
          }

          return res;
        })
      );
  }

  logOut() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  changePassword(data) {
    return this.httpClient.put(urls.accountChangePassword, data);
  }

  private getTokenValue(): IUserInfo {
    const jsonToken = JSON.parse(localStorage.getItem('token'));

    if (jsonToken) {
      const tokenValue = jwt_decode(jsonToken.token);
      return {
        id: tokenValue.id,
        role: tokenValue.z_role,
        userName: tokenValue.userName,
        token: jsonToken.token
      };
    }
  }
}
