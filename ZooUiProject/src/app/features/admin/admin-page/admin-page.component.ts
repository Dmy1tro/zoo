import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle } from 'src/app/core/constants/enums';
import { ToastrService } from 'ngx-toastr';
import { configureToastr } from 'src/app/core/helpers';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {

  dbForm: FormGroup;
  queryResult: string = null;

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
    if (this.dbForm.valid) {
      if (this.dbForm.value.queryType === 'query') {
        this.adminService.query({
          sqlQuery: this.dbForm.value.sqlQuery
        })
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              this.queryResult = JSON.stringify(data);
              console.log(data);
            },
            err => {
              this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
              console.log(err);
            });
      } else {
        this.adminService.command({
          sqlQuery: this.dbForm.value.sqlQuery
        })
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => this.queryResult = this.translate.instant(data.result),
            err => {
              this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
              console.log(err);
            });
      }
    } else {
      this.dbForm.markAllAsTouched();
    }
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
