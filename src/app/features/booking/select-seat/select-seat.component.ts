import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmBookingComponent } from '../confirm-booking/confirm-booking.component';

@Component({
  selector: 'app-select-seat',
  standalone: true,
  imports: [CommonModule, ConfirmBookingComponent],
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.scss'],
})
export class SelectSeatComponent implements OnChanges {
  @Input() journeyId!: number;
  @Input() carriageClassId!: number;
  @Input() journeyCarriageId!: number;
  @Input() startingStationId!: number;
  @Input() endingStationId!: number;

  seats: string[] = [];
  selectedSeat: string | null = null;
  seatingCapacity = 0;
  allSeats: string[] = [];
  availableSeats: string[] = [];
  showConfirmModal = false;

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes detected:', changes);
    console.log(
      'journeyId:',
      this.journeyId,
      'carriageClassId:',
      this.carriageClassId
    );

    if (
      this.journeyId > 0 &&
      this.carriageClassId > 0 &&
      this.journeyCarriageId > 0
    ) {
      this.loadSeats();
    }
  }

  loadSeats() {
    this.bookingService.getCarriageClassById(this.carriageClassId).subscribe({
      next: (carriage) => {
        this.seatingCapacity = carriage.SeatingCapacity;
        // Giả sử tất cả ghế là A1 -> A{SeatingCapacity}
        this.allSeats = Array.from(
          { length: this.seatingCapacity },
          (_, i) => `A${i + 1}`
        );

        this.bookingService
          .getAvailableSeats(this.journeyId, this.carriageClassId)
          .subscribe({
            next: (res) => {
              this.availableSeats = res.AvailableSeats;
            },
          });
      },
    });
  }

  selectSeat(seat: string) {
    this.selectedSeat = seat;
    this.showConfirmModal = false;

    // Lấy booking info hiện tại từ sessionStorage, nếu chưa có thì tạo mới
    const bookingInfoStr = sessionStorage.getItem('pendingBooking');
    const bookingInfo = bookingInfoStr ? JSON.parse(bookingInfoStr) : {};

    // Cập nhật thông tin ghế và carriage
    bookingInfo.journeyId = this.journeyId;
    bookingInfo.carriageClassId = this.carriageClassId;
    bookingInfo.journeyCarriageId = this.journeyCarriageId;
    bookingInfo.startStationId = this.startingStationId;
    bookingInfo.endStationId = this.endingStationId;
    bookingInfo.seatNo = this.selectedSeat;

    // Lưu lại sessionStorage
    sessionStorage.setItem('pendingBooking', JSON.stringify(bookingInfo));

    console.log('Đã lưu vào sessionStorage:', bookingInfo);
  }

  onConfirmBooking() {
    this.showConfirmModal = false;
    this.bookSeat(); // gọi method đặt vé
  }

  bookSeat() {
    const token = localStorage.getItem('token');

    const bookingInfoStr = sessionStorage.getItem('pendingBooking');
    if (!bookingInfoStr) {
      alert('Thông tin đặt vé không tồn tại!');
      return;
    }

    const bookingInfo = JSON.parse(bookingInfoStr);

    if (!bookingInfo.seatNo) {
      alert('Vui lòng chọn ghế trước!');
      return;
    }

    const userId = this.logUserFromToken();
    const bookingData = {
      UserId: userId,
      TrainJourneyId: bookingInfo.journeyId,
      StartingTrainStationId: bookingInfo.startStationId,
      EndingTrainStationId: bookingInfo.endStationId,
      CarriageClassId: bookingInfo.carriageClassId,
      SeatNo: bookingInfo.seatNo,
    };

    if (!token) {
      // Nếu chưa đăng nhập, lưu lại thông tin vào localStorage để sau login tiếp tục
      localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
      alert('Bạn cần đăng nhập để tiếp tục đặt vé!');
      this.router.navigate(['/login']);
      return;
    }

    this.bookingService.createBooking(bookingData).subscribe({
      next: () => {
        alert(`Đặt vé thành công ghế ${bookingInfo.seatNo}!`);
        // Xóa thông tin booking sau khi đặt thành công
        sessionStorage.removeItem('pendingBooking');
      },
      error: (err) => {
        console.error(err);
        alert('Đặt vé thất bại!');
      },
    });
  }

  logUserFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Chưa có token!');
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Thông tin user từ token:', payload);
      return payload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
    } catch (error) {
      console.error('Không thể giải mã token:', error);
      return null;
    }
  }
}
