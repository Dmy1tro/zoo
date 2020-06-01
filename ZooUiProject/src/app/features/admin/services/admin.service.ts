import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { urls } from 'src/app/core/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  query(data): Observable<any[]> {
    return this.httpClient.post<any[]>(urls.adminQuery, data);
  }

  command(data): Observable<any> {
    return this.httpClient.post<any>(urls.adminCommand, data);
  }

  craeteBackup() {
    return this.httpClient.post(urls.createBackup, null);
  }

  getBackup() {
    this.httpClient.get(urls.getBackup, { responseType: 'blob' })
      .subscribe(file => {
        saveAs(file, `backup${new Date().toDateString()}.bak`);
      },
      err => console.log(err));
  }
}
