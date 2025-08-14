import { Component, OnInit } from '@angular/core';
import {
  ScheduleLookupService,
  TrainStation,
} from '../services/schedule-lookup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridModule, ButtonModule } from '@coreui/angular';
import { ResultScheduleComponent } from '../result-schedule/result-schedule.component';

@Component({
  selector: 'app-search-schedule',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    ButtonModule,
    ResultScheduleComponent,
  ],
  templateUrl: './search-schedule.component.html',
  styleUrl: './search-schedule.component.scss',
})
export class SearchScheduleComponent implements OnInit {
  stations: TrainStation[] = [];
  startStationId: number | null = null;
  endStationId: number | null = null;
  travelDate: string | null = null;
  journeyList: any[] = [];

  constructor(private scheduleService: ScheduleLookupService) {}

  ngOnInit(): void {
    this.scheduleService.getAllStations().subscribe({
      next: (data) => {
        this.stations = data;
        console.log('Danh sách ga tàu:', this.stations);
      },
      error: (err) => {
        console.log('Lỗi khi lấy danh sách ga tàu:', err);
      },
    });
  }

  searchSchedule() {
    if (this.travelDate && this.startStationId && this.endStationId) {
      sessionStorage.setItem('startStationId', this.startStationId.toString());
      sessionStorage.setItem('endStationId', this.endStationId.toString());
      sessionStorage.setItem('travelDate', this.travelDate);

      const dateTimeForApi = `${this.travelDate}T00:00:00`;
      this.scheduleService
        .searchJourneys(dateTimeForApi, this.startStationId, this.endStationId)
        .subscribe({
          next: (res) => {
            // Gán journeys tạm thời
            this.journeyList = res;
            console.log('Kết quả tìm kiếm (raw từ API):', this.journeyList);

            // Với mỗi journey, gọi API lấy giờ khởi hành từ train station
            this.journeyList.forEach((journey) => {
              this.scheduleService
                .getStationsByJourneyId(journey.Id) // gọi API by-journey
                .subscribe((stations) => {
                  const startStation = stations.find(
                    (s) => s.TrainStationName === journey.StartStationName
                  );
                  if (startStation) {
                    journey.DepartureTime = startStation.DepartureTime;
                  }
                });
            });
            console.log(
              'Kết quả tìm kiếm (đang xử lý giờ khởi hành):',
              this.journeyList
            );
          },
          error: (err) => console.error(err),
        });
    }
  }
}
