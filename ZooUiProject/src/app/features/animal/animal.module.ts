import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnimalService } from './common/animal.service';
import { RationComponent } from './ration/ration.component';


@NgModule({
  declarations: [AnimalDetailsComponent, RationComponent],
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
