import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { RationComponent } from './ration/ration.component';


const routes: Routes = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: 'details', component: AnimalDetailsComponent },
  { path: 'ration/:animalId', component: RationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalRoutingModule { }
