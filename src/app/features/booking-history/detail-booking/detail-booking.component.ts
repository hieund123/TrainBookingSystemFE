import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonDirective, ModalModule } from '@coreui/angular';
import { BookingHistoryService } from '../services/booking-history.service';

@Component({
  selector: 'app-detail-booking',
  standalone: true,
  imports: [CommonModule, ModalModule, ButtonDirective],
  templateUrl: './detail-booking.component.html',
  styleUrls: ['./detail-booking.component.scss'],
})
export class DetailBookingComponent {
  @Input() bookingId!: number;

  bookingDetail: any;
  stationDepartureTime: string | null = null;
  visible = false;

  constructor(private bookingHistoryService: BookingHistoryService) {}

  loadBookingDetail() {
    this.bookingHistoryService
      .getBookingDetail(this.bookingId)
      .subscribe((res) => {
        console.log('📌 Booking Detail API response:', res);
        this.bookingDetail = res;

        if (res.StartingStationName && res.TrainJourneyId) {
          this.bookingHistoryService
            .getJourneyStations(res.TrainJourneyId)
            .subscribe((stations) => {
              console.log('📌 Journey stations:', stations);
              const station = stations.find(
                (s: any) => s.TrainStationName === res.StartingStationName
              );
              if (station) {
                this.stationDepartureTime = station.DepartureTime;
              }
            });
        }
      });
  }

  openModal(id: number) {
    this.bookingId = id;
    this.visible = true;
    this.loadBookingDetail();
  }

  closeModal() {
    this.visible = false;
    this.bookingDetail = null;
    this.stationDepartureTime = null;
  }

  cancelBooking() {
  if (!this.bookingId) return;

  if (confirm('Bạn có chắc chắn muốn huỷ vé này không?')) {
    this.bookingHistoryService.cancelBooking(this.bookingId).subscribe({
      next: (res) => {
        console.log('📌 Cancel response:', res);
        this.bookingDetail.Status = 'Cancelled'; 
        alert('Huỷ vé thành công!');
      },
      error: (err) => {
        console.error('❌ Cancel failed:', err);
        alert('Huỷ vé thất bại, vui lòng thử lại.');
      }
    });
  }
}

}
