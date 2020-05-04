import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from 'src/app/core/constants/urls';
import { IAnimal } from 'src/app/core/interfaces/animal.interface';
import { ICreatedId } from 'src/app/core/interfaces/createdId-interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient: HttpClient) { }

  getAnimals(): Observable<IAnimal[]> {
    return this.httpClient.get<IAnimal[]>(environment.apiUrl + urls.animals);
  }

  getAnimal(id): Observable<IAnimal> {
    return this.httpClient.get<IAnimal>(environment.apiUrl + urls.animals + '/' + id);
  }

  createAnimal(data): Observable<ICreatedId> {
    return this.httpClient.post<ICreatedId>(environment.apiUrl + urls.animals, data);
  }

  updateAnimal(data) {
    return this.httpClient.put(environment.apiUrl + urls.animals, data);
  }

  deleteAnimal(id) {
    return this.httpClient.delete(environment.apiUrl + urls.animals + '/' + id);
  }
}
