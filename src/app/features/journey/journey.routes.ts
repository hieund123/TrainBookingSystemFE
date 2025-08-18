import { Routes } from "@angular/router";
import { ListScheduleComponent } from "./list-schedule/list-schedule.component";
import { ListJourneyInScheduleComponent } from "./list-journey-in-schedule/list-journey-in-schedule.component";
import { AddJourneyComponent } from "./add-journey/add-journey.component";
import { DetailJourneyComponent } from "./detail-journey/detail-journey.component";

export const journeyRoutes: Routes = [
    {
        path: '',
        component: ListScheduleComponent
    },
    {
        path: ':scheduleId',
        component: ListJourneyInScheduleComponent
    },
    {
        path: ':scheduleId/:journeyId',
        component: DetailJourneyComponent
    },
    {
        path: 'journey/add',
        component: AddJourneyComponent
    }
]