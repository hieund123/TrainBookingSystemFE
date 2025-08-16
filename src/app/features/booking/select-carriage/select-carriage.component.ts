import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { SelectSeatComponent } from '../select-seat/select-seat.component';
import { ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-select-carriage',
  standalone: true,
  imports: [CommonModule, SelectSeatComponent, ButtonDirective],
  templateUrl: './select-carriage.component.html',
  styleUrls: ['./select-carriage.component.scss'],
})
export class SelectCarriageComponent implements OnInit {
  journeyId!: number;
  carriages: any[] = [];
  selectedCarriage: any = null;
  startStationId!: number;
  endStationId!: number;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.journeyId = +this.route.snapshot.params['journeyId'];
    const startId = sessionStorage.getItem('startStationId');
    const endId = sessionStorage.getItem('endStationId');

    this.startStationId = startId ? +startId : 0;
    this.endStationId = endId ? +endId : 0;

    this.loadCarriages();
  }

  loadCarriages() {
    this.bookingService.getCarriagesInJourney(this.journeyId).subscribe({
      next: (res) => (this.carriages = res),
      error: (err) => console.error(err),
    });
  }

  selectCarriage(carriage: any) {
    this.selectedCarriage = carriage;
    // 👇 Lưu scheduleId ngay tại đây
    sessionStorage.setItem('scheduleId', String(this.journeyId));

    const bookingInfoStr = sessionStorage.getItem('pendingBooking');
    const bookingInfo = bookingInfoStr ? JSON.parse(bookingInfoStr) : {};

    bookingInfo.scheduleId = this.journeyId;
    sessionStorage.setItem('pendingBooking', JSON.stringify(bookingInfo));
    console.log(bookingInfo);
  }
}
