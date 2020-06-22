import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAnimalDetails } from 'src/app/core/interfaces/animal-details.interface';
import { urls } from 'src/app/core/constants/urls';
import { ICreatedId } from 'src/app/core/interfaces/createdId.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalDetailsService {

  constructor(private httpClient: HttpClient) { }

  get(id): Observable<IAnimalDetails> {
    return this.httpClient.get<IAnimalDetails>(urls.animalDetails + id);
  }

  create(data): Observable<ICreatedId> {
    return this.httpClient.post<ICreatedId>(urls.animalDetails, data);
  }

  update(data) {
    return this.httpClient.put(urls.animalDetails, data);
  }
}
