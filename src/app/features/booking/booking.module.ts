//booking.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCarriageComponent } from './select-carriage/select-carriage.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { RouterModule } from '@angular/router';
import { bookingRoutes } from './booking.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(bookingRoutes),
    SelectCarriageComponent,
    SelectSeatComponent,
    ConfirmBookingComponent,
  ],
})
export class BookingModule {}
