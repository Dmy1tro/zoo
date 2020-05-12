import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobRoutingModule } from './job-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule
  ]
})
export class JobModule { }
