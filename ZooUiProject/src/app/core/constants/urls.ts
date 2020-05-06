import { environment } from 'src/environments/environment';

// tslint:disable-next-line:no-namespace
export namespace urls {
    // animal
    export const animals = environment.apiUrl + 'animals/';

    // ration
    export const rations = environment.apiUrl + 'rations/';
    export const rationsForAnimal = rations + 'for-animal/';
}
