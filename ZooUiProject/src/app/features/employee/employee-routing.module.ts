import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RoleManagerGuard } from 'src/app/core/guards/role.manager.guard';


const routes: Routes = [
  {
    path: '',
    component: EmployeeDetailsComponent,
    canActivate: [RoleManagerGuard],
    canLoad: [RoleManagerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
