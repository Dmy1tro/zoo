import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IAnimalFull } from 'src/app/core/interfaces/animal.interface';
import { IRation } from 'src/app/core/interfaces/ration.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RationService } from '../common/ration.service';
import { AnimalService } from '../common/animal.service';
import { takeUntil } from 'rxjs/operators';
import { configureToastr, deleteConfirmImport, refreshDataImport } from 'src/app/core/helpers';
import { MatDialog } from '@angular/material/dialog';
import { AnimalManagementComponent } from '../animal-management/animal-management.component';
import { RationComponent } from '../ration/ration.component';
import { toastrTitle, DataAction } from 'src/app/core/constants/enums';
import { TranslateService } from '@ngx-translate/core';
import { IAnimalDetails } from 'src/app/core/interfaces/animal-details.interface';
import { AnimalDetailsService } from '../common/animal-details.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-animal-info',
  templateUrl: './animal-info.component.html',
  styleUrls: ['./animal-info.component.css']
})
export class AnimalInfoComponent implements OnInit, OnDestroy {

  animal: IAnimalFull;
  animalDetails: IAnimalDetails;
  rations: IRation[] = [];
  animalId: number;
  animalDetailsForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private rationService: RationService,
              private animalSerivce: AnimalService,
              private animalDetailsService: AnimalDetailsService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.animalId = +this.route.snapshot.params.animalId;
    this.getAnimal();
    this.getRations();
    this.getAnimalDetails();
    configureToastr(this.toastr);
  }

  getAnimal() {
    this.animalSerivce.getAnimal(this.animalId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.animal = data);
  }

  getRations() {
    this.rationService.getRationsForAnimal(this.animalId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.rations = data);
  }

  getAnimalDetails() {
    this.animalDetailsService.get(this.animalId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.animalDetails = data;
        this.generateAnimalDetailsForm();
      });
  }

  generateAnimalDetailsForm() {
    this.animalDetailsForm = this.fb.group({
      weight: [this.animalDetails.weight],
      height: [this.animalDetails.height],
      bodyLength: [this.animalDetails.bodyLength],
      tailLength: [this.animalDetails.tailLength],
      price: [this.animalDetails.price],
      additionalInfo: [this.animalDetails.additionalInfo, Validators.maxLength(300)],
    });
  }

  backToAnimals() {
    this.router.navigate(['/animal/animal-list']);
  }

  updateDetails() {
    if (!this.animalDetailsForm.valid) {
      this.animalDetailsForm.markAllAsTouched();
      return;
    }

    this.animalDetailsService.update({
      animalDetailsId: this.animalDetails.animalDetailsId,
      animalId: this.animalId,
      ...this.animalDetailsForm.value
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.getAnimalDetails();
          this.toastr.success(this.translate.instant('Updated'), this.translate.instant(toastrTitle.Success));
        },
        (err) => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        });
  }

  updateAnimal() {
    this.dialog.open(AnimalManagementComponent, { width: '28%', autoFocus: true, data: this.animal })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.getAnimal();
        }
       });
  }

  resetForm() {
    this.generateAnimalDetailsForm();
  }

  addOrUpdateRation(id) {
    const ration = this.findOrDefaultRation(id);

    this.dialog.open(RationComponent, { width: '28%', autoFocus: true, data: ration })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getRations());
  }

  deleteRation(id) {
    if (!deleteConfirmImport(this.rations.find(x => x.rationId === id).foodName, this.translate)) {
      return;
    }

    this.rationService.deleteRation(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
        refreshDataImport(DataAction.Delete, this.rations, null, (x: IRation) => x.rationId === id);
        this.toastr.success(this.translate.instant('Deleted'), this.translate.instant(toastrTitle.Success));
        },
        (err) => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        });
  }

  findOrDefaultRation(id): IRation {
    if (id) {
      return this.rations.find(x => x.rationId === id);
    }

    return { animalId: this.animalId, rationId: null, foodName: null, description: null };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
