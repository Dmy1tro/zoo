import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { IDevice } from 'src/app/core/interfaces/device.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { configureToastr, getButtonStateImport, hasCustomErrorImport, enumSelector } from 'src/app/core/helpers';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle, DataAction, DeviceType } from 'src/app/core/constants/enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-update-device',
  templateUrl: './create-update-device.component.html',
  styleUrls: ['./create-update-device.component.css']
})
export class CreateUpdateDeviceComponent implements OnInit, OnDestroy {

  deviceForm: FormGroup;
  deviceTypes: any;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private deviceService: DeviceService,
              @Inject(MAT_DIALOG_DATA) private data: IDevice,
              private matDialogRef: MatDialogRef<CreateUpdateDeviceComponent>,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.deviceTypes = enumSelector(DeviceType);
    this.createForm();
    configureToastr(this.toastr);
  }

  createForm() {
    this.deviceForm = this.fb.group({
      name: [this.data.name, Validators.required],
      deviceType: [this.data.deviceType, Validators.required]
    });
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      this.data.smartDeviceId == null ? this.create() : this.update();
    } else {
      this.deviceForm.markAllAsTouched();
    }
  }

  create() {
    this.deviceService.createDevice({
      name: this.deviceForm.value.name,
      animalId: this.data.animalId,
      deviceType: this.deviceForm.value.deviceType
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.toastr.success(this.translate.instant('Created'), this.translate.instant(toastrTitle.Success));
          this.matDialogRef.close({ action: DataAction.Create, data: res.createdId });
        },
        (err) => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        });
  }

  update() {
    this.deviceService.updateDevice({
      smartDeviceId: this.data.smartDeviceId,
      newName: this.deviceForm.value.name,
      deviceType: this.deviceForm.value.deviceType
    })
     .pipe(takeUntil(this.destroy$))
     .subscribe(
      () => {
        this.toastr.success(this.translate.instant('Updated'), this.translate.instant(toastrTitle.Success));
        this.matDialogRef.close({ action: DataAction.Update, data: this.data.smartDeviceId });
      },
      (err) => {
        this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
        console.log(err);
      });
  }

  resetForm() {
    this.createForm();
  }

  getButtonState = () =>
    this.translate.instant(getButtonStateImport(this.data.smartDeviceId != null, 'Device'))

  hasCustomError = (form: FormGroup, control: string) =>
    hasCustomErrorImport(form, control)

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
