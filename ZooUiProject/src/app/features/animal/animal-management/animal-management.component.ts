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

@Component({
  selector: 'app-animal-management',
  templateUrl: './animal-management.component.html',
  styleUrls: ['./animal-management.component.css'],
  providers: [DatePipe]
})
export class AnimalManagementComponent implements OnInit, OnDestroy {

  animalForm: FormGroup;
  genders: any;
  animalId: number = null;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private animalService: AnimalService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private matDialogRef: MatDialogRef<AnimalManagementComponent>,
              private toastr: ToastrService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    console.log(this.data.name);
    this.animalId = this.data.animalId;
    this.genders = enumSelector(GENDER);
    this.createForm();
    configureToastr(this.toastr);
  }

  createForm() {
    this.animalForm = this.fb.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(100)]],
      gender: [this.data.gender, Validators.required],
      dateOfBirth: [this.data.dateOfBirth, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      this.animalId == null ? this.createAnimal() : this.updateAnimal();
      this.matDialogRef.close();
    } else {
      this.animalForm.markAllAsTouched();
    }
  }

  createAnimal() {
    this.animalService.createAnimal({
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
      animalId: this.animalId,
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
   getButtonStateImport(this.animalId != null, 'Animal')

  hasCustomError = (form: FormGroup, control: string) =>
   hasCustomErrorImport(form, control)

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
