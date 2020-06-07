import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { AnimalTypeListComponent } from './animal-type-list/animal-type-list.component';
import { AnimalInfoComponent } from './animal-info/animal-info.component';


const routes: Routes = [
  { path: '', redirectTo: 'animal-list', pathMatch: 'full' },
  { path: 'animal-list', component: AnimalDetailsComponent },
  { path: 'type-list', component: AnimalTypeListComponent },
  { path: 'animal-info/:animalId', component: AnimalInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalRoutingModule { }
