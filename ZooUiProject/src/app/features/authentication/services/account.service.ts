import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'src/app/core/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  signIn(data) {
    return this.httpClient.post(urls.accountSignIn, data);
  }

  create(data) {
    return this.httpClient.post(urls.account, data);
  }

  changePassword(data) {
    return this.httpClient.put(urls.accountChangePassword, data);
  }
}
