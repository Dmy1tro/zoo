import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IJob } from 'src/app/core/interfaces/job.interface';
import { JobService } from '../common/job.service';
import { ToastrService } from 'ngx-toastr';
import { configureToastr, enumSelector, refreshDataImport } from 'src/app/core/helpers';
import { takeUntil } from 'rxjs/operators';
import { JobStatus, DataAction } from 'src/app/core/constants/enums';
import { IUserInfo } from 'src/app/core/interfaces/user-info.interface';
import { AccountService } from '../../authentication/services/account.service';

@Component({
  selector: 'app-personal-jobs',
  templateUrl: './personal-jobs.component.html',
  styleUrls: ['./personal-jobs.component.css']
})
export class PersonalJobsComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;
  jobStatus = JobStatus;
  jobStatuses: any;
  jobs: IJob[] = [];
  jobsFiltered: IJob[] = [];
  jobSelected: IJob = null;
  currentUser: IUserInfo = null;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private jobService: JobService,
              private authService: AccountService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser;
    this.jobStatuses = enumSelector(JobStatus);
    this.createForm();
    this.getJobs();
    configureToastr(this.toastr);
  }

  createForm() {
    this.filterForm = this.fb.group({
      status: '*'
    });
  }

  getJobs() {
    this.jobService.getForEmployee(this.currentUser.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.jobs = data;
        this.jobsFiltered = this.jobs;
      });
  }

  selectStatus(value) {
    if (value === '*') {
      this.jobsFiltered = this.jobs;
      return;
    }

    this.jobsFiltered = this.jobs.filter(x => x.status === value);
  }

  selectJob(value) {
    this.jobSelected = value;
  }

  jobChanged(value) {
    refreshDataImport(value.action, this.jobs, value.data, (x: IJob) => x.jobId === value.data.jobId);
  }

  resetForm() {
    this.createForm();
    this.jobsFiltered = this.jobs;
    this.jobSelected = null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
