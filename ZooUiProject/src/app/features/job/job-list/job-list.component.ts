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
import { configureToastr, enumSelector, refreshDataImport } from 'src/app/core/helpers';
import { JobStatus } from 'src/app/core/constants/enums';
import { CreateUpdateJobComponent } from '../create-update-job/create-update-job.component';
import { TranslateService } from '@ngx-translate/core';

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
  jobStatuses: any;
  jobStatus = JobStatus;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private jobService: JobService,
              private employeeService: EmployeeService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private translate: TranslateService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.employeeId) {
      this.employeeId = this.route.snapshot.params.employeeId;
    }
    this.jobStatuses = enumSelector(JobStatus);
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
  }

  getAllJobs() {
    this.jobService.all()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.jobs = data;
        this.jobsFiltered = this.jobs;
      });
  }

  getJobsForEmployee(id) {
    this.jobService.getForEmployee(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.jobs = data;
        this.jobsFiltered = this.jobs;
      });
  }

  getEmployees() {
    this.employeeService.all()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.employees = data);
  }

  selectEmployee(value) {
    this.employeeId = value === '*'
      ? null
      : value;
    this.getJobs();
  }

  selectStatus(value) {
    this.jobsFiltered = this.jobs.filter(x => x.status === value);
  }

  selectJob(data) {
    this.jobSelected = data;
  }

  create() {
    const defaultJob = this.getDefaultFob();

    this.dialog.open(CreateUpdateJobComponent, { width: '30%', autoFocus: true, data: defaultJob })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.refreshData(res);
        }
      });
  }

  jobChanged(value) {
    refreshDataImport(value.action, this.jobs, value.data, (x: IJob) => x.jobId === value.data.jobId);
  }

  resetForm() {
    this.createForm();
    this.jobsFiltered = this.jobs;
    this.jobSelected = null;
  }

  private refreshData(result) {
    const id = result.data;
    const action = result.action;

    this.jobService.get(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        refreshDataImport(action, this.jobs, data, (x: IJob) => x.jobId === id);

        if (this.jobSelected && this.jobSelected.jobId === id) {
          this.jobSelected = data;
        }
      });
  }

  private getDefaultFob(): IJob {
    return {
      employeeId: this.employeeId,
      jobId: null,
      title: null,
      description: null,
      status: null,
      startDate: null,
      creationDate: null,
      finishDate: null
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
