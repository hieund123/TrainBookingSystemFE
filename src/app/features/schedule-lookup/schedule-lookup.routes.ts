// schedule-lookup.routes.ts
import { Routes } from '@angular/router';
import { SearchScheduleComponent } from './search-schedule/search-schedule.component';
import { ResultScheduleComponent } from './result-schedule/result-schedule.component';
import { DetailScheduleComponent } from './detail-schedule/detail-schedule.component';

export const scheduleLookupRoutes: Routes = [
  {
    path: '',
    component: SearchScheduleComponent
  },
  {
    path: 'result',
    component: ResultScheduleComponent
  },
  {
    path: 'detail-schedule/:id',
    component: DetailScheduleComponent
  }
];
