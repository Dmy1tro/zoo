import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IAnimal } from 'src/app/core/interfaces/animal.interface';
import { enumSelector, convertToISOFormat, configureToastr, hasCustomErrorImport, hasPatternErrorImport,
         getButtonStateImport, deleteConfirmImport } from 'src/app/core/helpers';
import { takeUntil, finalize } from 'rxjs/operators';
import { enums } from 'src/app/core/constants/enums';
import { AnimalService } from '../common/animal.service';
import { ICreatedId } from 'src/app/core/interfaces/createdId-interface';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css'],
  providers: [DatePipe]
})
export class AnimalDetailsComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private animalService: AnimalService,
              private toastr: ToastrService,
              private datePipe: DatePipe) { }

  animals: IAnimal[];
  animalForm: FormGroup;
  genders: any;
  animalId: number;

  private update: boolean;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.animalId = +this.route.snapshot.params.animalId;
    this.update = false;
    this.getAnimals();
    this.genders = enumSelector(enums.GENDER);
    this.createForm();
    configureToastr(this.toastr);
  }

  createForm(): void {
    this.animalForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      gender: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      this.update ? this.updateAnimal() : this.createAnimal();
    } else {
      this.animalForm.markAllAsTouched();
    }
  }

  getAnimals(): void {
    this.animalService.getAnimals()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.animals = data;
        if (this.animalId) {
          this.selectAnimal(this.animalId);
        }
      });
  }

  createAnimal(): void {
    const formValue = {
      name: this.animalForm.value.name,
      gender: this.animalForm.value.gender,
      dateOfBirth: convertToISOFormat(this.animalForm.value.dateOfBirth, this.datePipe)
    };

    this.animalService.createAnimal(formValue)
      .pipe(
        finalize(() => this.getAnimals()),
        takeUntil(this.destroy$))
      .subscribe(
        (res: ICreatedId) => {
          this.toastr.success('Animal created', enums.toastrTitle.Success);
          this.resetForm();
        },
        (err) => {
          this.toastr.error('Failed to create animal', enums.toastrTitle.Error);
          console.log(err);
        });
  }

  updateAnimal(): void {
    const formValue = this.animalForm.value;

    this.animalService.updateAnimal({
      animalId: this.animalId,
      name: formValue.name,
      gender: formValue.gender,
      dateOfBirth: convertToISOFormat(formValue.dateOfBirth, this.datePipe)
    })
      .pipe(
        finalize(() => this.getAnimals()),
        takeUntil(this.destroy$))
      .subscribe(
        () => {
        this.resetForm();
        this.toastr.success('Animal updated', enums.toastrTitle.Success);
        },
        (err) => {
          this.toastr.error('Failed to update animal', enums.toastrTitle.Error);
          console.log(err);
        });
  }

  deleteAnimal(id) {
    if (!deleteConfirmImport(this.animals.find(x => x.animalId === id).name)) {
      return;
    }

    this.animalService.deleteAnimal(id)
      .pipe(
        finalize(() => this.getAnimals()),
        takeUntil(this.destroy$))
      .subscribe(
        () => this.toastr.success('Animal deleted', enums.toastrTitle.Success),
        (err) => {
          this.toastr.error('Failed to delete animal', enums.toastrTitle.Error);
          console.log(err);
        }
      );
  }

  selectAnimal(id) {
    const animal = this.animals.find(x => x.animalId === id);
    this.update = true;
    this.animalId = animal.animalId;
    this.animalForm.patchValue({
      name: animal.name,
      gender: animal.gender,
      dateOfBirth: this.datePipe.transform(animal.dateOfBirth, 'yyyy-MM-dd')
    });
  }

  goToAnimalRation() {
    this.router.navigate(['/animal/ration', this.animalId]);
  }

  resetForm(): void {
    this.animalForm.reset();
    this.update = false;
    this.animalId = null;
  }

  getButtonState = (): string =>
    getButtonStateImport(this.update, 'Animal')

  hasCustomError = (form: FormGroup, control: string): boolean =>
    hasCustomErrorImport(form, control)

  hasPatternError = (form: FormGroup, control: string): boolean =>
    hasPatternErrorImport(form, control)

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
