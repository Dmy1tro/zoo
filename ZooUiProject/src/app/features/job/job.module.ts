import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobRoutingModule } from './job-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobInfoComponent } from './job-info/job-info.component';
import { CreateUpdateJobComponent } from './create-update-job/create-update-job.component';
import { JobListComponent } from './job-list/job-list.component';
import { PersonalJobsComponent } from './personal-jobs/personal-jobs.component';


@NgModule({
  declarations: [JobInfoComponent, CreateUpdateJobComponent, JobListComponent, PersonalJobsComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule
  ]
})
export class JobModule { }
