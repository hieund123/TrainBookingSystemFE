import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { trainStationRoutes } from './train-station.routes';
import { ListStationComponent } from './list-station/list-station.component';
import { EditStationComponent } from './edit-station/edit-station.component';
import { AddStationComponent } from './add-station/add-station.component';
import { ConfirmDeleteStationComponent } from './confirm-delete-station/confirm-delete-station.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormModule,
    RouterModule.forChild(trainStationRoutes),
    ListStationComponent,
    EditStationComponent,
    AddStationComponent,
    ConfirmDeleteStationComponent
  ]
})
export class TrainStationModule { }
