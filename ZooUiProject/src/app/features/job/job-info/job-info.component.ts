import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { JobService } from '../common/job.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { configureToastr, deleteConfirmImport } from 'src/app/core/helpers';
import { IJob } from 'src/app/core/interfaces/job.interface';
import { takeUntil, finalize } from 'rxjs/operators';
import { EmployeeService } from '../../employee/common/employee.service';
import { IEmployee } from 'src/app/core/interfaces/employee-interface';
import { CreateUpdateJobComponent } from '../create-update-job/create-update-job.component';
import { toastrTitle, JobStatus, DataAction } from 'src/app/core/constants/enums';
import { AccountService } from '../../authentication/services/account.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css']
})
export class JobInfoComponent implements OnInit, OnChanges, OnDestroy {

  @Input() job: IJob;
  @Output() jobChanged = new EventEmitter<any>();
  employee: IEmployee;
  jobStatus = JobStatus;
  canDoJob = false;

  private destroy$ = new Subject<void>();

  constructor(private jobService: JobService,
              private employeeService: EmployeeService,
              private authService: AccountService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initValues();
    configureToastr(this.toastr);
  }

  initValues() {
    this.canDoJob = this.job.employeeId === this.authService.getCurrentUser.id;
    this.getEmployee();
  }

  getEmployee() {
    if (this.employee && this.job.employeeId === this.employee.id) {
      return;
    }

    this.employeeService.get(this.job.employeeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.employee = data);
  }

  refreshJob() {
    this.jobService.get(this.job.jobId)
      .pipe(
        finalize(() => this.getEmployee()),
        takeUntil(this.destroy$))
      .subscribe(data => {
        this.job = data;
        this.jobChanged.emit({ data: this.job, action: DataAction.Update });
      });
  }

  update() {
    this.dialog.open(CreateUpdateJobComponent, { width: '34%', autoFocus: true, data: this.job })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.refreshJob());
  }

  delete() {
    if (!deleteConfirmImport('Job: ' + this.job.title)) {
      return;
    }

    this.jobService.delete(this.job.jobId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success('Deleted', toastrTitle.Success);
          this.jobChanged.emit({ data: this.job, action: DataAction.Delete });
          this.job = null;
        },
        err => {
          this.toastr.error('Failed', toastrTitle.Error);
          console.log(err);
        }
      );
  }

  startJob() {
    this.jobService.startJob(this.job.jobId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success('Started', toastrTitle.Success);
          this.refreshJob();
        },
        (err) => {
          this.toastr.error('Failed', toastrTitle.Error);
          console.log(err);
        });
  }

  finishJob() {
    this.jobService.finishJob(this.job.jobId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toastr.success('Finished', toastrTitle.Success);
        this.refreshJob();
      },
        (err) => {
          this.toastr.error('Failed', toastrTitle.Error);
          console.log(err);
        });
  }

  get isManager(): boolean {
    return this.authService.isManager;
  }

  ngOnChanges() {
    this.initValues();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
