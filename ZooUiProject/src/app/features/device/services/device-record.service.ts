import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/app/core/constants/urls';
import { ICreatedId } from 'src/app/core/interfaces/createdId.interface';
import { IDeviceRecord } from 'src/app/core/interfaces/device-record.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceRecordService {

  constructor(private httpClient: HttpClient) { }

  getRecords(deviceId): Observable<IDeviceRecord[]> {
    return this.httpClient.get<IDeviceRecord[]>(urls.deviceRecords + deviceId);
  }

  create(data): Observable<ICreatedId> {
    return this.httpClient.post<ICreatedId>(urls.deviceRecords, data);
  }
}
