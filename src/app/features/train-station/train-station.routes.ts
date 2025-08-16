import { Routes } from "@angular/router";
import { ListStationComponent } from './list-station/list-station.component';

export const trainStationRoutes: Routes = [
    {
        path: '',
        component: ListStationComponent,
    }
]