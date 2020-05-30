import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { JobService } from '../common/job.service';
import { IJob } from 'src/app/core/interfaces/job.interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { configureToastr, getButtonStateImport, hasCustomErrorImport, enumSelector } from 'src/app/core/helpers';
import { IEmployee } from 'src/app/core/interfaces/employee-interface';
import { EmployeeService } from '../../employee/common/employee.service';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle, JobStatus, DataAction } from 'src/app/core/constants/enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-update-job',
  templateUrl: './create-update-job.component.html',
  styleUrls: ['./create-update-job.component.css']
})
export class CreateUpdateJobComponent implements OnInit, OnDestroy {

  jobForm: FormGroup;
  employees: IEmployee[] = [];
  jobStatuses: any;

  private isUpdate = false;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private jobService: JobService,
              private employeeService: EmployeeService,
              @Inject(MAT_DIALOG_DATA) private data: IJob,
              private matDialogRef: MatDialogRef<CreateUpdateJobComponent>,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.isUpdate = this.data.jobId != null;
    this.jobStatuses = enumSelector(JobStatus, this.translate);
    this.createForm();
    this.getEmployees();
    configureToastr(this.toastr);
  }

  createForm() {
    this.jobForm = this.fb.group({
      employeeId: [this.data.employeeId, Validators.required],
      title: [this.data.title, Validators.required],
      description: [this.data.description]
    });

    if (this.isUpdate) {
      this.jobForm.addControl('status', new FormControl(this.data.status, Validators.required));
      this.jobForm.addControl('creationDate', new FormControl(this.data.creationDate, Validators.required));
      this.jobForm.addControl('startDate', new FormControl(this.data.startDate));
      this.jobForm.addControl('finishDate', new FormControl(this.data.finishDate));
    }
  }

  getEmployees() {
    this.employeeService.all()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.employees = data);
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      this.data.jobId == null ? this.create() : this.update();
    } else {
      this.jobForm.markAllAsTouched();
    }
  }

  get showFullForm(): boolean {
    return this.isUpdate;
  }

  create() {
    this.jobService.create(this.jobForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.toastr.success(this.translate.instant('Created'), this.translate.instant(toastrTitle.Success));
          this.matDialogRef.close({ action: DataAction.Create, data: res.createdId });
        },
        (err) => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        }
      );
  }

  update() {
    this.jobService.update({
      jobId: this.data.jobId,
      ...this.jobForm.value
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success(this.translate.instant('Updated'), this.translate.instant(toastrTitle.Success));
          this.matDialogRef.close({ action: DataAction.Update, data: this.data.jobId });
        },
        err => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        }
      );
  }

  resetForm() {
    this.createForm();
  }

  getButtonState = () =>
    this.translate.instant(getButtonStateImport(this.data.jobId != null, 'Job'))

  hasCustomError = (form: FormGroup, control: string) =>
    hasCustomErrorImport(form, control)

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
