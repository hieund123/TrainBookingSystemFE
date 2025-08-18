import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ButtonDirective,
  SpinnerModule,
  TableDirective,
  TableModule,
} from '@coreui/angular';
import { JourneyService, Schedule } from '../services/journey.service';
import { ScheduleLookupService } from '../../schedule-lookup/services/schedule-lookup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-schedule',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TableDirective,
    SpinnerModule,
    ButtonDirective,
  ],
  templateUrl: './list-schedule.component.html',
  styleUrl: './list-schedule.component.scss',
})
export class ListScheduleComponent implements OnInit {
  schedules: Schedule[] = [];
  loading = true;

  constructor(private journeyService: JourneyService, private router: Router) {}

  ngOnInit(): void {
    this.journeyService.getSchedules().subscribe({
      next: (data) => {
        console.log('Dữ liệu schedule từ API:', data);
        this.schedules = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading schedules', err);
        this.loading = false;
      },
    });
  }

  viewJourneys(schedule: any) {
    console.log('Schedule click:', schedule);
    console.log('Schedule.Id:', schedule?.Id);

    if (!schedule?.Id) {
      console.error('Schedule không có Id!');
      return;
    }

    this.router.navigate(['/journey', schedule.Id], { state: { schedule } });
  }
}
