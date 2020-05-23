import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountService } from '../../authentication/services/account.service';
import { IEmployee } from 'src/app/core/interfaces/employee-interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { configureToastr, getButtonStateImport, hasCustomErrorImport, enumSelector } from 'src/app/core/helpers';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle, GENDER, Job, Role } from 'src/app/core/constants/enums';
import { EmployeeService } from '../common/employee.service';

@Component({
  selector: 'app-create-update-employee',
  templateUrl: './create-update-employee.component.html',
  styleUrls: ['./create-update-employee.component.css']
})
export class CreateUpdateEmployeeComponent implements OnInit, OnDestroy {

  employeeForm: FormGroup;
  genders: any;
  jobs: any;
  roles: any;
  hide = true;
  hideConfirm = true;
  passError = null;

  private isUpdate = false;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private employeeService: EmployeeService,
              @Inject(MAT_DIALOG_DATA) private data: IEmployee,
              private matDialogRef: MatDialogRef<CreateUpdateEmployeeComponent>,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isUpdate = this.data.id != null;
    this.genders = enumSelector(GENDER);
    this.jobs = enumSelector(Job);
    this.roles = enumSelector(Role);
    this.createForm();
    configureToastr(this.toastr);
  }

  createForm() {
    this.employeeForm = this.fb.group({
      id: [this.data.id == null ? '' : this.data.id],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      dateOfBirth: [this.data.dateOfBirth, Validators.required],
      gender: [this.data.gender, Validators.required],
      position: [this.data.position, Validators.required],
      role: [null, Validators.required],
    });

    if (!this.isUpdate) {
      this.employeeForm.addControl('password', new FormControl(null, Validators.required));
      this.employeeForm.addControl('confirmPassword', new FormControl(null, Validators.required));
    }
  }

  get showPasswordForm(): boolean {
    return !this.isUpdate;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.isUpdate ? this.update() : this.create();
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  create() {
    if (!this.checkPasswordsMatch(null)) {
      return;
    }

    this.employeeForm.removeControl('confirmPassword');

    this.accountService.create(this.employeeForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.toastr.success('Created', toastrTitle.Success);
          this.resetForm();
          this.matDialogRef.close();
        },
        (err) => {
          this.toastr.error('Failed to create', toastrTitle.Error);
          console.log(err);
        });
  }

  update() {
    this.employeeService.update(this.employeeForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success('Updated', toastrTitle.Success);
          this.resetForm();
          this.matDialogRef.close();
        },
        (err) => {
          this.toastr.error('Failed to update', toastrTitle.Error);
          console.log(err);
        });
  }

  checkPasswordsMatch(value): boolean {
    const formValue = this.employeeForm.value;

    if (formValue.password !== formValue.confirmPassword) {
      this.passError = 'Password does not match with confirm password';
      return false;
    } else {
      this.passError = null;
      return true;
    }
  }

  resetForm() {
    this.createForm();
    this.passError = null;
  }

  getButtonState = () =>
    getButtonStateImport(this.isUpdate, 'Employee')

  hasCustomError = (form: FormGroup, control: string) =>
    hasCustomErrorImport(form, control)

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
