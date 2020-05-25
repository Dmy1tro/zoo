import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { PersonalJobsComponent } from './personal-jobs/personal-jobs.component';


const routes: Routes = [
  { path: '', redirectTo: 'job-list', pathMatch: 'full' },
  { path: 'job-list/:employeeId', component: JobListComponent },
  { path: 'job-list', component: JobListComponent },
  { path: 'personal-jobs', component: PersonalJobsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
