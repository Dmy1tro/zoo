import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { IUserInfo } from 'src/app/core/interfaces/user-info.interface';
import { configureToastr } from 'src/app/core/helpers';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle } from 'src/app/core/constants/enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  passwordForm: FormGroup;
  currentUser: IUserInfo;
  hideCurrent = true;
  hideNewPassword = true;
  hideConfirm = true;

  private destroy$ = new Subject<void>();

  constructor(private authService: AccountService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private matDialogRef: MatDialogRef<ChangePasswordComponent>,
              private trasnlate: TranslateService) { }

  ngOnInit(): void {
    this.createForm();
    configureToastr(this.toastr);
  }

  createForm() {
    this.passwordForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.changePassword();
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  checkPasswordsMatch(value): boolean {
    const formValue = this.passwordForm.value;

    if (!formValue.newPassword || !formValue.confirmPassword) {
      return false;
    }

    if (formValue.newPassword !== formValue.confirmPassword) {
      this.passwordForm.get('confirmPassword').setErrors({
        error: 'New password does not match with confirm password'
      });

      return false;
    }

    return true;
  }

  private changePassword() {
    if (!this.checkPasswordsMatch(null)) {
      return false;
    }

    this.authService.changePassword(this.passwordForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success(this.trasnlate.instant('Changed'), this.trasnlate.instant(toastrTitle.Success));
          this.matDialogRef.close();
        },
        (err) => {
          this.toastr.error(this.trasnlate.instant('Failed'), this.trasnlate.instant(toastrTitle.Error));
          console.log(err);
        }
      );
  }

  resetForm() {
    this.passwordForm.reset();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
