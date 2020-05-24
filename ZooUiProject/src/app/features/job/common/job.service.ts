import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJob } from 'src/app/core/interfaces/job.interface';
import { urls } from 'src/app/core/constants/urls';
import { ICreatedId } from 'src/app/core/interfaces/createdId.interface';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpClient: HttpClient) { }

  all(): Observable<IJob[]> {
    return this.httpClient.get<IJob[]>(urls.jobs);
  }

  get(id): Observable<IJob> {
    return this.httpClient.get<IJob>(urls.jobs + id);
  }

  getForEmployee(employeeId): Observable<IJob[]> {
    return this.httpClient.get<IJob[]>(urls.jobsForEmployee + employeeId);
  }

  create(data): Observable<ICreatedId> {
    return this.httpClient.post<ICreatedId>(urls.jobs, data);
  }

  startJob(id) {
    return this.httpClient.put(urls.jobsStart + id, null);
  }

  finishJob(id) {
    return this.httpClient.put(urls.jobsFinish + id, null);
  }

  update(data) {
    return this.httpClient.put(urls.jobs, data);
  }

  delete(id) {
    return this.httpClient.delete(urls.jobs + id);
  }
}
