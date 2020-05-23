import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SmartDeviceListComponent } from './smart-device-list/smart-device-list.component';
import { CreateUpdateDeviceComponent } from './create-update-device/create-update-device.component';
import { DeviceRoutingModule } from './device-routing.module';


@NgModule({
  declarations: [SmartDeviceListComponent, CreateUpdateDeviceComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    SharedModule
  ]
})
export class DeviceModule { }
