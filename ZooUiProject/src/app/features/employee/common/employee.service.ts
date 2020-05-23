import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/core/interfaces/employee-interface';
import { urls } from 'src/app/core/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  all(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(urls.employees);
  }

  get(id): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(urls.employees + id);
  }

  profile(): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(urls.employeeProfile);
  }

  update(data) {
    return this.httpClient.put(urls.employees, data);
  }

  delete(id) {
    return this.httpClient.delete(urls.employees + id);
  }
}
