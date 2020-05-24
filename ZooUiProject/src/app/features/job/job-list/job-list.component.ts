import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobService } from '../common/job.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IJob } from 'src/app/core/interfaces/job.interface';
import { IEmployee } from 'src/app/core/interfaces/employee-interface';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../../employee/common/employee.service';
import { configureToastr } from 'src/app/core/helpers';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;
  employeeId: string = null;
  jobs: IJob[] = [];
  jobsFiltered: IJob[] = [];
  jobSelected: IJob = null;
  employees: IEmployee[] = [];

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private jobService: JobService,
              private employeeService: EmployeeService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.employeeId) {
      this.employeeId = this.route.snapshot.params.employeeId;
    }
    this.createForm();
    this.getJobs();
    this.getEmployees();
    configureToastr(this.toastr);
  }

  createForm() {
    this.filterForm = this.fb.group({
      employeeId: this.employeeId ?? '*',
      status: null
    });
  }

  getJobs() {
    if (this.employeeId) {
      this.getJobsForEmployee(this.employeeId);
    } else {
      this.getAllJobs();
    }

    this.jobsFiltered = this.jobs;
  }

  getAllJobs() {
    this.jobService.all()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.jobs = data);
  }

  getJobsForEmployee(id) {
    this.jobService.getForEmployee(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.jobs = data);
  }

  getEmployees() {
    this.employeeService.all()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.employees = data);
  }

  selectJob(data) {
    this.jobSelected = data;
  }

  jobChanged(value) {
    if (value.action === 'update') {
      const index = this.jobs.findIndex(x => x.jobId === value.data.jobId);
      this.jobs[index] = value.data;
    } else {
      this.jobs = this.jobs.filter(x => x.jobId !== value.data.jobId);
    }
  }

  resetForm() {
    this.createForm();
    this.jobsFiltered = this.jobs;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
