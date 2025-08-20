import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BookingHistoryService,
  BookingHistory,
} from '../services/booking-history.service';
import {
  BadgeModule,
  TableDirective,
  TabsModule,
  ModalModule,
  ButtonDirective,
} from '@coreui/angular';
import { DetailBookingComponent } from '../detail-booking/detail-booking.component';

@Component({
  selector: 'app-booking-history-list',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    BadgeModule,
    TabsModule,
    ModalModule,
    ButtonDirective,
    DetailBookingComponent,
  ],
  templateUrl: './booking-history-list.component.html',
  styleUrls: ['./booking-history-list.component.scss'],
})
export class BookingHistoryListComponent implements OnInit {
  bookingHistory: BookingHistory[] = [];
  pendingBookings: BookingHistory[] = [];
  confirmedBookings: BookingHistory[] = [];
  cancelledBookings: BookingHistory[] = [];
  visibleDetail = false;
  selectedBookingId: number | null = null;

  userId: string | null = null;

  constructor(private bookingHistoryService: BookingHistoryService) {}

  ngOnInit(): void {
    this.decodeToken();
    if (this.userId) {
      this.bookingHistoryService.getByUser(this.userId).subscribe({
        next: (res) => {
          this.bookingHistory = res;
          this.splitBookings();
          console.log('📌 bookings:', res);
        },
        error: (err) => console.error('Lỗi lấy booking:', err),
      });
    }
  }

  splitBookings() {
    this.pendingBookings = this.bookingHistory.filter(
      (b) => b.Status === 'Pending'
    );
    this.confirmedBookings = this.bookingHistory.filter(
      (b) => b.Status === 'Confirmed'
    );
    this.cancelledBookings = this.bookingHistory.filter(
      (b) => b.Status === 'Cancelled'
    );
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Không tìm thấy token trong localStorage');
      return;
    }

    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      this.userId =
        decodedPayload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
    } catch (e) {
      console.error('Lỗi giải mã token:', e);
    }
  }

  openDetail(bookingId: number) {
    console.log('📌 chọn bookingId:', bookingId);
    this.selectedBookingId = bookingId;
    this.visibleDetail = true;
  }
}
