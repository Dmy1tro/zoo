import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAnimalType } from 'src/app/core/interfaces/animal-type.interface';
import { urls } from 'src/app/core/constants/urls';
import { Observable } from 'rxjs';
import { ICreatedId } from 'src/app/core/interfaces/createdId.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalTypeService {

  constructor(private httpClient: HttpClient) { }

  getAnimalTypes(): Observable<IAnimalType[]> {
    return this.httpClient.get<IAnimalType[]>(urls.animalTypes);
  }

  create(data): Observable<ICreatedId> {
    return this.httpClient.post<ICreatedId>(urls.animalTypes, data);
  }

  update(data) {
    return this.httpClient.put(urls.animalTypes, data);
  }

  delete(id) {
    return this.httpClient.delete(urls.animalTypes + id);
  }
}
