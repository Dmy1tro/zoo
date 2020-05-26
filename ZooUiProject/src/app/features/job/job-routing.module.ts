import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { PersonalJobsComponent } from './personal-jobs/personal-jobs.component';
import { RoleManagerGuard } from 'src/app/core/guards/role.manager.guard';


const routes: Routes = [
  { path: '', redirectTo: 'job-list', pathMatch: 'full', canLoad: [RoleManagerGuard], canActivate: [RoleManagerGuard] },
  { path: 'job-list/:employeeId', component: JobListComponent, canLoad: [RoleManagerGuard], canActivate: [RoleManagerGuard] },
  { path: 'job-list', component: JobListComponent, canLoad: [RoleManagerGuard], canActivate: [RoleManagerGuard] },
  { path: 'personal-jobs', component: PersonalJobsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
