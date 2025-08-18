import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { journeyRoutes } from './journey.routes';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { ListJourneyInScheduleComponent } from './list-journey-in-schedule/list-journey-in-schedule.component';
import { AddJourneyComponent } from './add-journey/add-journey.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(journeyRoutes),
    ListScheduleComponent,
    ListJourneyInScheduleComponent,
    AddJourneyComponent
  ]
})
export class JourneyModule { }
