import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/app/core/constants/urls';
import { IAnimal, IAnimalFull } from 'src/app/core/interfaces/animal.interface';
import { ICreatedId } from 'src/app/core/interfaces/createdId.interface';
import { IAnimalType } from 'src/app/core/interfaces/animal-type.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient: HttpClient) { }

  getAnimals(): Observable<IAnimalFull[]> {
    return this.httpClient.get<IAnimalFull[]>(urls.animals);
  }

  getAnimal(id): Observable<IAnimalFull> {
    return this.httpClient.get<IAnimalFull>(urls.animals + id);
  }

  createAnimal(data): Observable<ICreatedId> {
    return this.httpClient.post<ICreatedId>(urls.animals, data);
  }

  updateAnimal(data) {
    return this.httpClient.put(urls.animals, data);
  }

  deleteAnimal(id) {
    return this.httpClient.delete(urls.animals + id);
  }
}
