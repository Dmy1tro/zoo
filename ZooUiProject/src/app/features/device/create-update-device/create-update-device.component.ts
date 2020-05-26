import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { IDevice } from 'src/app/core/interfaces/device.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { configureToastr, getButtonStateImport, hasCustomErrorImport } from 'src/app/core/helpers';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { toastrTitle, DataAction } from 'src/app/core/constants/enums';

@Component({
  selector: 'app-create-update-device',
  templateUrl: './create-update-device.component.html',
  styleUrls: ['./create-update-device.component.css']
})
export class CreateUpdateDeviceComponent implements OnInit, OnDestroy {

  deviceForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private deviceService: DeviceService,
              @Inject(MAT_DIALOG_DATA) private data: IDevice,
              private matDialogRef: MatDialogRef<CreateUpdateDeviceComponent>,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    configureToastr(this.toastr);
  }

  createForm() {
    this.deviceForm = this.fb.group({
      name: [this.data.name, Validators.required]
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
      animalId: this.data.animalId
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.toastr.success('Created', toastrTitle.Success);
          this.matDialogRef.close({ action: DataAction.Create, data: res.createdId });
        },
        (err) => {
          this.toastr.error('Failed to create', toastrTitle.Error);
          console.log(err);
        });
  }

  update() {
    this.deviceService.updateDevice({
      smartDeviceId: this.data.smartDeviceId,
      newName: this.deviceForm.value.name
    })
     .pipe(takeUntil(this.destroy$))
     .subscribe(
      () => {
        this.toastr.success('Updated', toastrTitle.Success);
        this.matDialogRef.close({ action: DataAction.Update, data: this.data.smartDeviceId });
      },
      (err) => {
        this.toastr.error('Failed to update', toastrTitle.Error);
        console.log(err);
      });
  }

  resetForm() {
    this.createForm();
  }

  getButtonState = () =>
    getButtonStateImport(this.data.smartDeviceId != null, 'Device')

  hasCustomError = (form: FormGroup, control: string) =>
    hasCustomErrorImport(form, control)

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
