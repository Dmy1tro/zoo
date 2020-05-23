import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnimalService } from '../../animal/common/animal.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { IAnimalFull, IAnimal } from 'src/app/core/interfaces/animal.interface';
import { configureToastr, deleteConfirmImport } from 'src/app/core/helpers';
import { DeviceService } from '../services/device.service';
import { IDevice } from 'src/app/core/interfaces/device.interface';
import { toastrTitle } from 'src/app/core/constants/enums';
import { CreateUpdateDeviceComponent } from '../create-update-device/create-update-device.component';
import { IDeviceRecord } from 'src/app/core/interfaces/device-record.interface';
import { DeviceRecordService } from '../services/device-record.service';

@Component({
  selector: 'app-smart-device-list',
  templateUrl: './smart-device-list.component.html',
  styleUrls: ['./smart-device-list.component.css']
})
export class SmartDeviceListComponent implements OnInit, OnDestroy {

  public typeNames: string[] = [];
  public animals: IAnimalFull[] = [];
  public animalsFiltered: IAnimalFull[] = [];
  public devices: IDevice[] = [];
  public deviceRecords: IDeviceRecord[] = null;
  public filterForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private deviceService: DeviceService,
              private deviceRecordService: DeviceRecordService,
              private animalService: AnimalService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm();
    this.getAnimals();
    configureToastr(this.toastr);
  }

  getAnimals(): void {
    this.animalService.getAnimals()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.animals = data.sort((a, b) => Date.parse(a.dateOfBirth) < Date.parse(b.dateOfBirth) ? 1 : -1);
        this.animalsFiltered = this.animals;
        this.typeNames = this.animals
          .map(x => x.typeName)
          .filter((item, index, arr) => arr.indexOf(item) === index);
      });
  }

  createForm() {
    this.filterForm = this.fb.group({
      typeName: null,
      animalId: null
    });
  }

  selectedAnimalType(value) {
    if (this.filterForm.value.typeName == null) {
      this.animalsFiltered = this.animals;
    } else {
      this.filterForm.get('animalId').setValue(null);
      this.devices = [];
      this.deviceRecords = null;
      this.animalsFiltered = this.animals.filter(x => x.typeName === this.filterForm.value.typeName);
    }
  }

  selectAnimal(value) {
    this.deviceRecords = null;
    this.getDevicesForAnimal();
  }

  openRecords(id) {
    this.deviceRecordService.getRecords(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => this.deviceRecords = data,
        err => console.log(err));
  }

  get canCreate(): boolean {
    return this.filterForm.value.animalId != null;
  }

  get canOpenRecords(): boolean {
    return this.deviceRecords != null;
  }

  addOrUpdate(id) {
    const device = this.findOrDefaultDevice(id);

    this.dialog.open(CreateUpdateDeviceComponent, { width: '28%', autoFocus: true, data: device })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getDevicesForAnimal());
  }

  delete(id) {
    if (!deleteConfirmImport(this.devices.find(x => x.smartDeviceId === id).name)) {
      return;
    }

    this.deviceService.deleteDevice(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.devices = this.devices.filter(x => x.smartDeviceId !== id);
          this.toastr.success('Created', toastrTitle.Success);
        },
        (err) => {
          this.toastr.error('Failed', toastrTitle.Error);
          console.log(err);
        }
      );
  }

  findOrDefaultDevice(id): IDevice {
    if (id) {
      return this.devices.find(x => x.smartDeviceId === id);
    }

    return { smartDeviceId: null, animalId: this.filterForm.value.animalId, name: null };
  }

  resetForm() {
    this.createForm();
    this.animalsFiltered = this.animals;
    this.devices = [];
    this.deviceRecords = null;
  }

  private getDevicesForAnimal() {
    this.deviceService.getDevicesForAnimal(this.filterForm.value.animalId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => this.devices = data.sort((a, b) => a.name > b.name ? 1 : -1),
        err => console.log(err));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
