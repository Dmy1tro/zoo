import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/app/core/constants/urls';
import { IAnimalFull } from 'src/app/core/interfaces/animal.interface';
import { ICreatedId } from 'src/app/core/interfaces/createdId.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient: HttpClient) { }

  getAnimals(): Observable<IAnimalFull[]> {
    return this.httpClient.get<IAnimalFull[]>(urls.animals)
      .pipe(
        map(data => {
          data.forEach(this.mapAnimal);
          return data;
        })
      );
  }

  getAnimal(id): Observable<IAnimalFull> {
    return this.httpClient.get<IAnimalFull>(urls.animals + id)
      .pipe(
        map(this.mapAnimal)
      );
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

  private mapAnimal(data: IAnimalFull): IAnimalFull {
    if (data.picture && data.contentType) {
      data.picture = `data:${data.contentType};base64,${data.picture}`;
    } else {
      data.picture = './assets/images/animal_default.png';
    }

    return data;
  }
}
