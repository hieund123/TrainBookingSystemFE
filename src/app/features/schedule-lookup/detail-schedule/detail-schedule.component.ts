import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleLookupService } from '../services/schedule-lookup.service';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, TableModule } from '@coreui/angular';

@Component({
  selector: 'app-detail-schedule',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ButtonModule],
  templateUrl: './detail-schedule.component.html',
  styleUrl: './detail-schedule.component.scss',
})
export class DetailScheduleComponent implements OnInit {
  journeyId: number | null = null;
  journey: any = null;
  journeyStations: any[] = [];
  carriages: any[] = [];

  startStationId!: number;
  endStationId!: number;
  travelDate!: string;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleLookupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.startStationId = Number(sessionStorage.getItem('startStationId'));
    this.endStationId = Number(sessionStorage.getItem('endStationId'));
    this.travelDate = sessionStorage.getItem('travelDate') || '';

    console.log('Start Station ID:', this.startStationId);
    console.log('End Station ID:', this.endStationId);
    console.log('Travel Date:', this.travelDate);

    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('Param id:', id);
      if (id) {
        this.journeyId = +id;
        this.loadJourneyDetails();
      }
    });
  }

  loadJourneyDetails() {
    if (!this.journeyId) return;

    // Lấy Journey
    this.scheduleService.getJourneyById(this.journeyId).subscribe({
      next: (data: any) => {
        console.log('✅ Journey:', data);
        this.journey = data;
      },
      error: (err) => {
        console.error('❌ Lỗi lấy Journey:', err);
      },
    });

    // Lấy danh sách ga dừng
    this.scheduleService.getStationsByJourneyId(this.journeyId).subscribe({
      next: (stations: any[]) => {
        console.log('🚉 Stations:', stations);
        this.journeyStations = stations;
      },
      error: (err) => {
        console.error('❌ Lỗi lấy Stations:', err);
      },
    });

    // Lấy danh sách toa
    this.scheduleService.getCarriagesInJourney(this.journeyId).subscribe({
      next: (carriages: any[]) => {
        console.log('🚂 Carriages:', carriages);
        this.carriages = carriages;
      },
      error: (err) => {
        console.error('❌ Lỗi lấy Carriages:', err);
      },
    });
  }

  goBack() {
    this.router.navigate(['/schedule-lookup']);
  }

  bookTicket() {
    if (this.journeyId) {
      // Lưu thông tin booking vào sessionStorage
      const bookingInfo = {
        journeyId: this.journeyId,
        startStationId: this.startStationId,
        endStationId: this.endStationId
      };
      sessionStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));

      console.log(bookingInfo);
      // Điều hướng sang trang booking
      this.router.navigate(['/booking', this.journeyId]);
    }
  }
}
