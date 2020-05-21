import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AnimalService } from '../common/animal.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { enumSelector, configureToastr, getButtonStateImport, convertToISOFormat, hasCustomErrorImport } from 'src/app/core/helpers';
import { GENDER, toastrTitle } from 'src/app/core/constants/enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { IAnimal, IAnimalFull } from 'src/app/core/interfaces/animal.interface';
import { IAnimalType } from 'src/app/core/interfaces/animal-type.interface';
import { AnimalTypeService } from '../common/animal-type.service';

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
              private datePipe: DatePipe) { }

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
          this.toastr.error('Failed to load animal types', toastrTitle.Error);
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
      this.matDialogRef.close();
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
          this.toastr.success('Animal created', toastrTitle.Success);
          this.resetForm();
        },
        (err) => {
          this.toastr.error('Failed to create animal', toastrTitle.Error);
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
        this.resetForm();
        this.toastr.success('Animal updated', toastrTitle.Success);
        },
        (err) => {
          this.toastr.error('Failed to update animal', toastrTitle.Error);
          console.log(err);
        });
  }

  resetForm() {
    this.createForm();
  }

  getButtonState = () =>
   getButtonStateImport(this.data.animalId != null, 'Animal')

  hasCustomError = (form: FormGroup, control: string) =>
   hasCustomErrorImport(form, control)

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
