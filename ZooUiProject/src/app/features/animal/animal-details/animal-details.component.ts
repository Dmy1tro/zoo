import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IAnimal, IAnimalFull } from 'src/app/core/interfaces/animal.interface';
import { configureToastr, deleteConfirmImport } from 'src/app/core/helpers';
import { takeUntil } from 'rxjs/operators';
import { AnimalService } from '../common/animal.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { toastrTitle } from 'src/app/core/constants/enums';
import { MatDialog } from '@angular/material/dialog';
import { AnimalManagementComponent } from '../animal-management/animal-management.component';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css'],
  providers: [DatePipe]
})
export class AnimalDetailsComponent implements OnInit, OnDestroy {

  public animals: IAnimalFull[];
  public filteredAnimals: IAnimalFull[];
  public filterForm: FormGroup;

  private sortValue = true;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private animalService: AnimalService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAnimals();
    this.createForm();
    configureToastr(this.toastr);
  }

  getAnimals(): void {
    this.animalService.getAnimals()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.animals = data.sort((a, b) => Date.parse(a.dateOfBirth) < Date.parse(b.dateOfBirth) ? 1 : -1);
        this.filterAnimals();
      });
  }

  createForm(): void {
    this.filterForm = this.fb.group({
      name: [null],
      fromDate: [null],
      byDate: [null]
    });
  }

  filterAnimals() {
    const formValue = this.filterForm.value;
    this.filteredAnimals = this.animals;

    if (formValue.name) {
      this.filteredAnimals = this.filteredAnimals.filter(x => x.name.toUpperCase().includes(formValue.name.toUpperCase()));
    }

    if (formValue.fromDate) {
      this.filteredAnimals = this.filteredAnimals.filter(x => Date.parse(x.dateOfBirth) >= formValue.fromDate);
    }

    if (formValue.byDate) {
      this.filteredAnimals = this.filteredAnimals.filter(x => Date.parse(x.dateOfBirth) <= formValue.byDate);
    }
  }

  deleteAnimal(id) {
    if (!deleteConfirmImport(this.animals.find(x => x.animalId === id).name)) {
      return;
    }

    this.animalService.deleteAnimal(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.animals = this.animals.filter(x => x.animalId !== id);
          this.filterAnimals();
          this.toastr.success('Animal deleted', toastrTitle.Success);
        },
        (err) => {
          this.toastr.error('Failed to delete animal', toastrTitle.Error);
          console.log(err);
        }
      );
  }

  goToInfo(id) {
    this.router.navigate(['/animal/animal-info', id]);
  }

  addOrUpdate(id) {
    const animal = this.findOrDefaultAnimal(id);

    this.dialog.open(AnimalManagementComponent, { width: '28%', autoFocus: true, data: animal })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAnimals();
       });
  }

  sortBy(value) {
    if (value === 'name') {
      this.filteredAnimals.sort((a, b) => (this.sortValue ? (a.name > b.name) : (a.name < b.name)) ? 1 : -1);
    }

    if (value === 'date') {
      this.filteredAnimals.sort((a, b) =>
        (this.sortValue ? (a.dateOfBirth > b.dateOfBirth) : (a.dateOfBirth < b.dateOfBirth)) ? 1 : -1);
    }

    if (value === 'type') {
      this.filteredAnimals.sort((a, b) => (this.sortValue ? (a.typeName > b.typeName) : (a.typeName < b.typeName)) ? 1 : -1);
    }

    this.sortValue = !this.sortValue;
  }

  findOrDefaultAnimal(id): IAnimal {
    if (id) {
      return this.animals.find(x => x.animalId === id);
    }

    return { animalTypeId: null, animalId: null, name: null, gender: null, dateOfBirth: null };
  }

  resetForm(): void {
    this.filterForm.reset();
    this.filteredAnimals = this.animals;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
