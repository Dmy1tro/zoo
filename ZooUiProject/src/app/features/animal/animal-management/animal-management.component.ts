import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('pictureFile') pictureFile: ElementRef;

  animalForm: FormGroup;
  genders: any;
  file: any;
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
    this.genders = enumSelector(GENDER);
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

  onUpload(input) {
    this.file = input.target.files[0];
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      this.data.animalId == null ? this.createAnimal() : this.updateAnimal();
    } else {
      this.animalForm.markAllAsTouched();
    }
  }

  createAnimal() {
    const formData = this.getFormData();

    this.animalService.createAnimal(formData)
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
    const formData = this.getFormData();

    this.animalService.updateAnimal(formData)
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
    this.pictureFile.nativeElement.value = null;
    this.file = null;
  }

  private getFormData(): FormData {
    const form = new FormData();

    form.append('animalId', '' + (this.data.animalId ?? 0));
    form.append('animalTypeId', this.animalForm.value.animalTypeId);
    form.append('name', this.animalForm.value.name);
    form.append('gender', this.animalForm.value.gender);
    form.append('dateOfBirth', convertToISOFormat(this.animalForm.value.dateOfBirth, this.datePipe));

    if (this.file) {
      form.append('picture', this.file);
    }

    return form;
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
