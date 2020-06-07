import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartDeviceListComponent } from './smart-device-list/smart-device-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'device-list', pathMatch: 'full' },
  { path: 'device-list', component: SmartDeviceListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
