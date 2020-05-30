import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalTypeService } from '../common/animal-type.service';
import { IAnimalType } from 'src/app/core/interfaces/animal-type.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { configureToastr, getButtonStateImport, hasCustomErrorImport } from 'src/app/core/helpers';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle, DataAction } from 'src/app/core/constants/enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-update-animal-type',
  templateUrl: './create-update-animal-type.component.html',
  styleUrls: ['./create-update-animal-type.component.css']
})
export class CreateUpdateAnimalTypeComponent implements OnInit, OnDestroy {

  animalTypeForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private animalTypeService: AnimalTypeService,
              @Inject(MAT_DIALOG_DATA) private data: IAnimalType,
              private matDialogRef: MatDialogRef<CreateUpdateAnimalTypeComponent>,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.createForm();
    configureToastr(this.toastr);
  }

  createForm() {
    this.animalTypeForm = this.fb.group({
      typeName: [this.data.typeName, Validators.required]
    });
  }

  onSubmit() {
    if (this.animalTypeForm.valid) {
      this.data.animalTypeId == null ? this.createAnimalType() : this.updateAnimalType();
    } else {
      this.animalTypeForm.markAllAsTouched();
    }
  }

  createAnimalType() {
    this.animalTypeService.create({
      typeName: this.animalTypeForm.value.typeName
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

  updateAnimalType() {
    this.animalTypeService.update({
      animalTypeId: this.data.animalTypeId,
      typeName: this.animalTypeForm.value.typeName
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.error(this.translate.instant('Updated'), this.translate.instant(toastrTitle.Success));
          this.matDialogRef.close({ action: DataAction.Update, data: this.data.animalTypeId });
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
    this.translate.instant(getButtonStateImport(this.data.animalTypeId != null, 'Animal-type'))

  hasCustomError = (form: FormGroup, control: string) =>
    hasCustomErrorImport(form, control)

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
