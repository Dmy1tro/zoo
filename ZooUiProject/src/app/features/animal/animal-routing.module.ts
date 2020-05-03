import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: 'details', component: AnimalDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalRoutingModule { }
