import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';


@NgModule({
  declarations: [AnimalDetailsComponent],
  imports: [
    CommonModule,
    AnimalRoutingModule
  ]
})
export class AnimalModule { }
