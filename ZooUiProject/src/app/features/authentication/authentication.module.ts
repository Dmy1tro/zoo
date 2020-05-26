import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SignInComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
