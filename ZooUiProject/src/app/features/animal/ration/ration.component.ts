import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { IRation } from 'src/app/core/interfaces/ration.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { configureToastr, getButtonStateImport, hasPatternErrorImport, hasCustomErrorImport } from 'src/app/core/helpers';
import { ToastrService } from 'ngx-toastr';
import { RationService } from '../common/ration.service';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle } from 'src/app/core/constants/enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ration',
  templateUrl: './ration.component.html',
  styleUrls: ['./ration.component.css']
})
export class RationComponent implements OnInit, OnDestroy {

  rationForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private rationService: RationService,
              @Inject(MAT_DIALOG_DATA) private data: IRation,
              private matDialogRef: MatDialogRef<RationComponent>) { }

  ngOnInit(): void {
    this.createForm();
    configureToastr(this.toastr);
  }

  createForm(): void {
    this.rationForm = this.fb.group({
      foodName: [this.data.foodName, [Validators.required, Validators.maxLength(100)]],
      description: [this.data.description, [Validators.required, Validators.maxLength(200)]]
    });
  }

  onSubmit(): void {
    if (this.rationForm.valid) {
      this.data.rationId !== null ? this.updateRation() : this.createRation();
    } else {
      this.rationForm.markAllAsTouched();
    }
  }

  createRation() {
    this.rationService.createRation({
      animalId: this.data.animalId,
      ...this.rationForm.value
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.toastr.success('Created', toastrTitle.Success);
          this.matDialogRef.close({ action: 'create', data: res.createdId });
        },
        (err) => {
          this.toastr.error('Failed', toastrTitle.Error);
          console.log(err);
        }
      );
  }

  updateRation() {
    this.rationService.updateRation({
      rationId: this.data.rationId,
      animalId: this.data.animalId,
      ...this.rationForm.value
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success('Updated', toastrTitle.Success);
          this.matDialogRef.close({ action: 'update', data: this.data.rationId });
        },
        (err) => {
          this.toastr.error('Failed', toastrTitle.Error);
          console.log(err);
        }
      );
  }

  resetForm(): void {
    this.createForm();
  }

  getButtonState = (): string =>
    getButtonStateImport(this.data.rationId !== null, 'Ration')

  hasCustomError = (form: FormGroup, control: string): boolean =>
    hasCustomErrorImport(form, control)

  hasPatternError = (form: FormGroup, control: string): boolean =>
    hasPatternErrorImport(form, control)

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
