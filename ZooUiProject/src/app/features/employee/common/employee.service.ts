import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/core/interfaces/employee-interface';
import { urls } from 'src/app/core/constants/urls';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  all(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(urls.employees)
      .pipe(
        map(data => {
          data.forEach(this.mapEmployee);
          return data;
        })
      );
  }

  get(id): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(urls.employees + id)
      .pipe(
        map(this.mapEmployee)
      );
  }

  profile(): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(urls.employeeProfile)
      .pipe(
        map(this.mapEmployee)
      );
  }

  update(data) {
    return this.httpClient.put(urls.employees, data);
  }

  updatePicture(data) {
    return this.httpClient.put(urls.changePicture, data);
  }

  delete(id) {
    return this.httpClient.delete(urls.employees + id);
  }

  private mapEmployee(data: IEmployee): IEmployee {
    if (data.picture && data.contentType) {
      data.picture = `data:${data.contentType};base64,${data.picture}`;
    } else {
      data.picture = './assets/images/userAvatar.png';
    }

    return data;
  }
}
