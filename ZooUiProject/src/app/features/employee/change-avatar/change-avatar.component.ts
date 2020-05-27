import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../common/employee.service';
import { configureToastr } from 'src/app/core/helpers';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle, DataAction } from 'src/app/core/constants/enums';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit, OnDestroy {

  @ViewChild('pictureFile') pictureFile: ElementRef;

  file: any;
  hasError = false;

  private destroy$ = new Subject<void>();

  constructor(private employeeService: EmployeeService,
              private toastr: ToastrService,
              private matDialogRef: MatDialogRef<ChangeAvatarComponent>) { }

  ngOnInit(): void {
    configureToastr(this.toastr);
  }

  onUpload(input) {
    this.hasError = false;
    this.file = input.target.files[0];
  }

  resetForm() {
    this.hasError = false;
    this.pictureFile.nativeElement.value = null;
    this.file = null;
  }

  onSubmit() {
    if (this.file) {
      this.changePicture();
    } else {
      this.hasError = true;
    }
  }

  private changePicture() {
    const form = new FormData();
    form.append('picture', this.file);

    this.employeeService.updatePicture(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success('Done', toastrTitle.Success);
          this.matDialogRef.close({ action: DataAction.Update });
        },
        (err) => {
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
