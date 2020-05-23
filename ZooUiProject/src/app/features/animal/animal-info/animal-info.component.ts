import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IAnimalFull } from 'src/app/core/interfaces/animal.interface';
import { IRation } from 'src/app/core/interfaces/ration.interface';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RationService } from '../common/ration.service';
import { AnimalService } from '../common/animal.service';
import { takeUntil } from 'rxjs/operators';
import { configureToastr, deleteConfirmImport } from 'src/app/core/helpers';
import { MatDialog } from '@angular/material/dialog';
import { AnimalManagementComponent } from '../animal-management/animal-management.component';
import { RationComponent } from '../ration/ration.component';
import { toastrTitle } from 'src/app/core/constants/enums';

@Component({
  selector: 'app-animal-info',
  templateUrl: './animal-info.component.html',
  styleUrls: ['./animal-info.component.css']
})
export class AnimalInfoComponent implements OnInit, OnDestroy {

  animal: IAnimalFull;
  rations: IRation[] = [];
  rationForm: FormGroup;
  animalId: number;

  private destroy$ = new Subject<any>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private rationService: RationService,
              private animalSerivce: AnimalService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.animalId = +this.route.snapshot.params.animalId;
    this.getAnimal();
    this.getRations();
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

  backToAnimals() {
    this.router.navigate(['/animal/animal-list']);
  }

  updateAnimal() {
    this.dialog.open(AnimalManagementComponent, { width: '28%', autoFocus: true, data: this.animal })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAnimal();
       });
  }

  addOrUpdateRation(id) {
    const ration = this.findOrDefaultRation(id);

    this.dialog.open(RationComponent, { width: '28%', autoFocus: true, data: ration })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getRations());
  }

  deleteRation(id) {
    if (!deleteConfirmImport(this.rations.find(x => x.rationId === id).foodName)) {
      return;
    }

    this.rationService.deleteRation(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
        this.rations = this.rations.filter(x => x.rationId !== id);
        this.toastr.success('Deleted', toastrTitle.Success);
        },
        (err) => {
          this.toastr.error('Failed', toastrTitle.Error);
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
