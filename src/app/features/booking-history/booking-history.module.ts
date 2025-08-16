import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { bookingHistoryRoutes } from './booking-history.routes';
import { BookingHistoryListComponent } from './booking-history-list/booking-history-list.component';
import {DetailBookingComponent} from './detail-booking/detail-booking.component'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(bookingHistoryRoutes),
    BookingHistoryListComponent,
    DetailBookingComponent
  ]
})
export class BookingHistoryModule { }
