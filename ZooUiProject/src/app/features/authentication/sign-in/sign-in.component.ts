import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AccountService } from '../services/account.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { toastrTitle } from 'src/app/core/constants/enums';
import { Router } from '@angular/router';
import { configureToastr } from 'src/app/core/helpers';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  hide = true;

  private destroy$ = new Subject<void>();

  constructor(private authService: AccountService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private translate: TranslateService) { }

  ngOnInit(): void {
    if (this.authService.getCurrentUser) {
      this.router.navigate(['/']);
    }

    this.createForm();
    configureToastr(this.toastr);
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.signIn();
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  private signIn() {
    this.authService.signIn(this.signInForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (err) => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
