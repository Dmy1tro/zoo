import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAnimalType } from 'src/app/core/interfaces/animal-type.interface';
import { Subject } from 'rxjs';
import { AnimalTypeService } from '../common/animal-type.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { toastrTitle } from 'src/app/core/constants/enums';
import { deleteConfirmImport, refreshDataImport } from 'src/app/core/helpers';
import { CreateUpdateAnimalTypeComponent } from '../create-update-animal-type/create-update-animal-type.component';

@Component({
  selector: 'app-animal-type-list',
  templateUrl: './animal-type-list.component.html',
  styleUrls: ['./animal-type-list.component.css']
})
export class AnimalTypeListComponent implements OnInit, OnDestroy {

  animalTypes: IAnimalType[] = [];

  private destroy$ = new Subject<void>();

  constructor(private animalTypeService: AnimalTypeService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAnimalTypes();
  }

  getAnimalTypes() {
    this.animalTypeService.getAnimalTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.animalTypes = res.sort((a, b) => a.typeName > b.typeName ? 1 : -1);
        },
        (err) => {
          console.log(err);
          this.toastr.error('Failed to load animal types', toastrTitle.Error);
        });
  }

  addOrUpdate(id) {
    const animalType = this.findOrDefaultAnimalType(id);

    this.dialog.open(CreateUpdateAnimalTypeComponent, { width: '28%', autoFocus: true, data: animalType })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.refreshData(res);
        }
       });
  }

  delete(id) {
    if (!deleteConfirmImport(this.animalTypes.find(x => x.animalTypeId === id).typeName)) {
      return;
    }

    this.animalTypeService.delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.animalTypes = this.animalTypes.filter(x => x.animalTypeId !== id);
          this.toastr.success('Animal deleted', toastrTitle.Success);
        },
        (err) => {
          this.toastr.error('Failed to delete animal', toastrTitle.Error);
          console.log(err);
        }
      );
  }

  findOrDefaultAnimalType(id): IAnimalType {
    if (id) {
      return this.animalTypes.find(x => x.animalTypeId === id);
    }

    return { animalTypeId: null, typeName: null };
  }

  private refreshData(dialogResult) {
    const id = dialogResult.data;
    const action = dialogResult.action;
    this.animalTypeService.get(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        refreshDataImport(action, this.animalTypes, data, (x: IAnimalType) => x.animalTypeId === id);
        this.animalTypes.sort((a, b) => a.typeName > b.typeName ? 1 : -1);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
