// src/app/features/booking/booking.routes.ts
import { Routes } from '@angular/router';
import { SelectCarriageComponent } from './select-carriage/select-carriage.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';

export const bookingRoutes: Routes = [
  { path: ':journeyId', component: SelectCarriageComponent },
  { path: 'confirm', component: ConfirmBookingComponent }
];
