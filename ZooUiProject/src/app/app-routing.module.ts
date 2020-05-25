import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'animal', pathMatch: 'full' },
  {
    path: 'animal',
    loadChildren: () => import('./features/animal/animal.module').then(m => m.AnimalModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'device',
    loadChildren: () => import('./features/device/device.module').then(m => m.DeviceModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./features/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'job',
    loadChildren: () => import('./features/job/job.module').then(m => m.JobModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
