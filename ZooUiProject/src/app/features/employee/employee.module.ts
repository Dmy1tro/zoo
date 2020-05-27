import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateUpdateEmployeeComponent } from './create-update-employee/create-update-employee.component';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [EmployeeDetailsComponent, CreateUpdateEmployeeComponent, ChangeAvatarComponent, ProfileComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
