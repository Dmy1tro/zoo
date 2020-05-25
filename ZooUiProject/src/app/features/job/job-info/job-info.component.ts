import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
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
import { toastrTitle } from 'src/app/core/constants/enums';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css']
})
export class JobInfoComponent implements OnInit, OnDestroy {

  @Input() job: IJob;
  @Output() jobChanged = new EventEmitter<any>();
  employee: IEmployee;

  private destroy$ = new Subject<void>();

  constructor(private jobService: JobService,
              private employeeService: EmployeeService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployee();
    configureToastr(this.toastr);
  }

  getJob() {
    this.jobService.get(this.job.jobId)
      .pipe(
        finalize(() => this.getEmployee()),
        takeUntil(this.destroy$))
      .subscribe(data => {
        this.job = data;
        this.jobChanged.emit({ data: this.job, action: 'update' });
      });
  }

  getEmployee() {
    this.employeeService.get(this.job.employeeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.employee = data);
  }

  update() {
    this.dialog.open(CreateUpdateJobComponent, { width: '34%', autoFocus: true, data: this.job })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getJob());
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
          this.jobChanged.emit({ data: this.job, action: 'delete' });
          this.job = null;
        },
        err => {
          this.toastr.error('Failed', toastrTitle.Error);
          console.log(err);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
