import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnimalService } from './common/animal.service';
import { RationComponent } from './ration/ration.component';
import { AnimalManagementComponent } from './animal-management/animal-management.component';
import { AnimalTypeListComponent } from './animal-type-list/animal-type-list.component';
import { CreateUpdateAnimalTypeComponent } from './create-update-animal-type/create-update-animal-type.component';


@NgModule({
  declarations: [AnimalDetailsComponent, RationComponent, AnimalManagementComponent, AnimalTypeListComponent, CreateUpdateAnimalTypeComponent],
  imports: [
    CommonModule,
    AnimalRoutingModule,
    SharedModule
  ],
  providers: [
    AnimalService
  ]
})
export class AnimalModule { }
