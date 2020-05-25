import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IJob } from 'src/app/core/interfaces/job.interface';
import { JobService } from '../common/job.service';
import { ToastrService } from 'ngx-toastr';
import { configureToastr, enumSelector, refreshDataImport } from 'src/app/core/helpers';
import { takeUntil } from 'rxjs/operators';
import { JobStatus } from 'src/app/core/constants/enums';

@Component({
  selector: 'app-personal-jobs',
  templateUrl: './personal-jobs.component.html',
  styleUrls: ['./personal-jobs.component.css']
})
export class PersonalJobsComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;
  jobStatuses: any;
  jobs: IJob[] = [];
  jobsFiltered: IJob[] = [];
  jobSelected: IJob = null;
  fake = '15c7f48b-8bd9-4554-a1e8-6a5dfa7a58e6';

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private jobService: JobService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.jobStatuses = enumSelector(JobStatus);
    this.createForm();
    this.getJobs();
    configureToastr(this.toastr);
  }

  createForm() {
    this.filterForm = this.fb.group({
      status: null
    });
  }

  getJobs() {
    this.jobService.getForEmployee(this.fake)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.jobs = data;
        this.jobsFiltered = this.jobs;
      });
  }

  selectStatus(value) {
    this.jobsFiltered = this.jobs.filter(x => x.status === value);
  }

  selectJob(value) {
    this.jobSelected = value;
  }

  jobChanged(value) {
    if (value.action === 'update') {
      refreshDataImport('update', this.jobs, value.data, (x: IJob) => x.jobId === value.data.jobId);
    } else if (value.action === 'delete') {
      const index = this.jobs.findIndex(x => x.jobId === value.data.jobId);
      this.jobs.splice(index, 1);
    }
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
