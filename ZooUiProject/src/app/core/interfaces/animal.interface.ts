export interface IAnimal {
    animalId: number;
    animalTypeId: number;
    name: string;
    gender: string;
    dateOfBirth: string;
    picture: any;
    contentType: string;
}

export interface IAnimalFull extends IAnimal {
    typeName: string;
}
