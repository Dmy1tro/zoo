import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'animal', pathMatch: 'full' },
  {
    path: 'animal',
    loadChildren: () => import('./features/animal/animal.module').then(m => m.AnimalModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'authentication',
    loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'device',
    loadChildren: () => import('./features/device/device.module').then(m => m.DeviceModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./features/employee/employee.module').then(m => m.EmployeeModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'job',
    loadChildren: () => import('./features/job/job.module').then(m => m.JobModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
