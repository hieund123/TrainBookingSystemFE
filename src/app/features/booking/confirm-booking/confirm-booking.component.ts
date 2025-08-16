import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
} from '@coreui/angular';
import { BookingService } from '../services/booking.service';
import { forkJoin } from 'rxjs';

export interface BookingInfo {
  journeyId: number;
  scheduleId: number;
  startStationId: number;
  endStationId: number;
  carriageClassId: number;
  journeyCarriageId: number;
  price: number;
  seatNo: string;
}

@Component({
  selector: 'app-confirm-booking',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
  ],
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss'],
})
export class ConfirmBookingComponent implements OnInit {
  @Input() seatNo: string | null = null;
  @Output() confirmed = new EventEmitter<BookingInfo>();

  bookingInfo: BookingInfo | null = null;
  journeyName = '';
  scheduleName = '';
  startStationName = '';
  endStationName = '';
  carriageClassName = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.refreshFromSession();
    if (this.bookingInfo) {
      this.loadNames(this.bookingInfo);
    }
  }

  refreshFromSession(): void {
    const raw = sessionStorage.getItem('pendingBooking');
    this.bookingInfo = raw ? JSON.parse(raw) : null;

    // phòng trường hợp seatNo truyền qua @Input mới hơn dữ liệu trong session
    if (this.bookingInfo) {
      if (this.seatNo) this.bookingInfo.seatNo = this.seatNo;
      // Ép kiểu an toàn nếu backend cần number
      this.bookingInfo = {
        ...this.bookingInfo,
        journeyId: Number(this.bookingInfo.journeyId || 0),
        scheduleId: Number(this.bookingInfo.scheduleId || 0),
        startStationId: Number(this.bookingInfo.startStationId || 0),
        endStationId: Number(this.bookingInfo.endStationId || 0),
        carriageClassId: Number(this.bookingInfo.carriageClassId || 0),
        price: Number(this.bookingInfo.price || 0),
      };
    }
  }

  loadNames(info: BookingInfo) {
    forkJoin({
      journey: this.bookingService.getJourneyById(info.journeyId),
      schedule: this.bookingService.getScheduleById(info.scheduleId),
      startStation: this.bookingService.getStationById(info.startStationId),
      endStation: this.bookingService.getStationById(info.endStationId),
      carriageClass: this.bookingService.getCarriageClassById(
        info.carriageClassId
      ),
      carriagePrice: this.bookingService.getCarriagePrice(
        info.scheduleId,
        info.carriageClassId
      ),
    }).subscribe((result) => {
      console.log('Raw API result:', result);
      this.journeyName = result.journey?.Name || '';
      this.scheduleName = result.schedule?.Name || '';
      this.startStationName = result.startStation?.StationName || '';
      this.endStationName = result.endStation?.StationName || '';
      this.carriageClassName = result.carriageClass?.CarriageName || '';
      this.bookingInfo!.price = result.carriagePrice?.Price || 0;


      console.log('Tên hành trình:', this.journeyName);
      console.log('Tên lịch chạy:', this.scheduleName);
      console.log('Ga đi:', this.startStationName);
      console.log('Ga đến:', this.endStationName);
      console.log('Loại toa:', this.carriageClassName);
      console.log('Giá vé:', this.bookingInfo!.price);
    });
  }

  confirmBooking(): void {
    if (this.bookingInfo) {
      this.confirmed.emit(this.bookingInfo);
    }
  }
}
