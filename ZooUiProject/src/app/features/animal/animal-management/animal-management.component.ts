import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AnimalService } from '../common/animal.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { enumSelector, configureToastr, getButtonStateImport, convertToISOFormat, hasCustomErrorImport } from 'src/app/core/helpers';
import { GENDER, toastrTitle, DataAction } from 'src/app/core/constants/enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { IAnimal } from 'src/app/core/interfaces/animal.interface';
import { IAnimalType } from 'src/app/core/interfaces/animal-type.interface';
import { AnimalTypeService } from '../common/animal-type.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-animal-management',
  templateUrl: './animal-management.component.html',
  styleUrls: ['./animal-management.component.css'],
  providers: [DatePipe]
})
export class AnimalManagementComponent implements OnInit, OnDestroy {

  animalForm: FormGroup;
  genders: any;
  animalTypes: IAnimalType[] = [];

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private animalService: AnimalService,
              private animalTypeService: AnimalTypeService,
              @Inject(MAT_DIALOG_DATA) private data: IAnimal,
              private matDialogRef: MatDialogRef<AnimalManagementComponent>,
              private toastr: ToastrService,
              private datePipe: DatePipe,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.genders = enumSelector(GENDER, this.translate);
    this.getAnimalTypes();
    this.createForm();
    configureToastr(this.toastr);
  }

  getAnimalTypes() {
    this.animalTypeService.getAnimalTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.animalTypes = res;
        },
        (err) => {
          console.log(err);
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
        });
  }

  createForm() {
    this.animalForm = this.fb.group({
      animalTypeId: [this.data.animalTypeId, Validators.required],
      name: [this.data.name, [Validators.required, Validators.maxLength(100)]],
      gender: [this.data.gender, Validators.required],
      dateOfBirth: [this.data.dateOfBirth, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      this.data.animalId == null ? this.createAnimal() : this.updateAnimal();
    } else {
      this.animalForm.markAllAsTouched();
    }
  }

  createAnimal() {
    this.animalService.createAnimal({
      animalTypeId: this.animalForm.value.animalTypeId,
      name: this.animalForm.value.name,
      gender: this.animalForm.value.gender,
      dateOfBirth: convertToISOFormat(this.animalForm.value.dateOfBirth, this.datePipe)
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

  updateAnimal() {
    this.animalService.updateAnimal({
      animalId: this.data.animalId,
      animalTypeId: this.animalForm.value.animalTypeId,
      name: this.animalForm.value.name,
      gender: this.animalForm.value.gender,
      dateOfBirth: convertToISOFormat(this.animalForm.value.dateOfBirth, this.datePipe)
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success(this.translate.instant('Updated'), this.translate.instant(toastrTitle.Success));
          this.matDialogRef.close({ action: DataAction.Update, data: this.data.animalId });
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
    this.translate.instant(getButtonStateImport(this.data.animalId != null, 'Animal'))

  hasCustomError = (form: FormGroup, control: string) =>
    hasCustomErrorImport(form, control)

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
