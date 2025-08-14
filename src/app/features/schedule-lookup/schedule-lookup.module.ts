// src/app/features/schedule-lookup/schedule-lookup.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { scheduleLookupRoutes } from './schedule-lookup.routes';
import { SearchScheduleComponent } from './search-schedule/search-schedule.component';
import { FormsModule } from '@angular/forms';
import { ResultScheduleComponent } from './result-schedule/result-schedule.component';
import { DetailScheduleComponent } from './detail-schedule/detail-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(scheduleLookupRoutes),
    SearchScheduleComponent,
    ResultScheduleComponent,
    DetailScheduleComponent
  ],
  exports: [
    SearchScheduleComponent
  ]
})
export class ScheduleLookupModule {}
