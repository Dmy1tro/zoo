import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRation } from 'src/app/core/interfaces/ration.interface';
import { urls } from 'src/app/core/constants/urls';
import { ICreatedId } from 'src/app/core/interfaces/createdId-interface';

@Injectable({
  providedIn: 'root'
})
export class RationService {

  constructor(private httpClient: HttpClient) { }

  getRationsForAnimal(animalId: number): Observable<IRation[]> {
    return this.httpClient.get<IRation[]>(urls.rationsForAnimal + animalId);
  }

  createRation(data): Observable<ICreatedId> {
    return this.httpClient.post<ICreatedId>(urls.rations, data);
  }

  updateRation(data) {
    return this.httpClient.put(urls.rations, data);
  }

  deleteRation(id) {
    return this.httpClient.delete(urls.rations + id);
  }
}
