import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/app/core/constants/urls';
import { IDevice } from 'src/app/core/interfaces/device.interface';
import { ICreatedId } from 'src/app/core/interfaces/createdId.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) { }

  getDevices(): Observable<IDevice[]> {
    return this.httpClient.get<IDevice[]>(urls.devices);
  }

  getDevice(id): Observable<IDevice> {
    return this.httpClient.get<IDevice>(urls.devices + id);
  }

  getDevicesForAnimal(animalId): Observable<IDevice[]> {
    return this.httpClient.get<IDevice[]>(urls.devicesForAnimal + animalId);
  }

  createDevice(data): Observable<ICreatedId> {
    return this.httpClient.post<ICreatedId>(urls.devices, data);
  }

  updateDevice(data) {
    return this.httpClient.put(urls.devices, data);
  }

  deleteDevice(id) {
    return this.httpClient.delete(urls.devices + id);
  }
}
