import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle } from 'src/app/core/constants/enums';
import { ToastrService } from 'ngx-toastr';
import { configureToastr, hasCustomErrorImport } from 'src/app/core/helpers';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {

  dbForm: FormGroup;
  queryResult: string = null;
  commandResult: string = null;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private adminService: AdminService,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.createForm();
    configureToastr(this.toastr);
  }

  createForm() {
    this.dbForm = this.fb.group({
      sqlQuery: [null, Validators.required],
      queryType: ['query', Validators.required]
    });
  }

  onSubmit() {
    if (!this.dbForm.valid) {
      this.dbForm.markAllAsTouched();
      return;
    }

    if (this.dbForm.value.queryType === 'query') {
      this.executeQuery({ sqlQuery: this.dbForm.value.sqlQuery });
    } else {
      this.executeCommand({ sqlQuery: this.dbForm.value.sqlQuery });
    }
  }

  private executeQuery(formValue) {
    this.adminService.query(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.commandResult = null;
          this.queryResult = JSON.stringify(data);
        },
        err => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        }
      );
  }

  private executeCommand(formValue) {
    this.adminService.command(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.queryResult = null;
          this.commandResult = data.result > 0
            ? 'Complete'
            : 'No-rows-have-changed';
        },
        err => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        }
      );
  }

  createBackup() {
    this.adminService.craeteBackup()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.toastr.success(this.translate.instant('Complete'), this.translate.instant(toastrTitle.Success)),
        err => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        }
      );
  }

  getBackup() {
    this.adminService.getBackup();
  }

  resetForm() {
    this.createForm();
  }

  hasCustomError = (form: FormGroup, control: string) =>
    hasCustomErrorImport(form, control)

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
