import { Component } from '@angular/core';
import { Journey, JourneyService, Schedule } from '../services/journey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  CardModule,
  FormModule,
  ModalComponent,
  ModalModule,
  TableDirective,
  TableModule,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-journey-in-schedule',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    TableModule,
    CardModule,
    ButtonModule,
    ModalComponent,
    FormsModule,
    FormModule,
    ModalModule,
  ],
  templateUrl: './list-journey-in-schedule.component.html',
  styleUrl: './list-journey-in-schedule.component.scss',
})
export class ListJourneyInScheduleComponent {
  schedule: any;
  journeys: any[] = [];

  visibleAddJourney = false;
  newJourneyName = '';
  newJourneyDateTime: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private journeyService: JourneyService
  ) {}

  ngOnInit(): void {
    this.schedule = history.state.schedule;
    console.log('Schedule từ state:', this.schedule);

    const scheduleId = this.route.snapshot.paramMap.get('scheduleId');
    if (this.schedule?.Id) {
      this.loadJourneys(this.schedule.Id);
    } else if (scheduleId) {
      this.journeyService.getScheduleById(+scheduleId).subscribe({
        next: (sch) => {
          this.schedule = sch;
          this.loadJourneys(sch.Id);
        },
        error: (err) => console.error('Error load schedule', err),
      });
    }
  }

  loadJourneys(scheduleId: number) {
    this.journeyService.getJourneysByScheduleId(scheduleId).subscribe({
      next: (data) => {
        this.journeys = data;
        console.log('Journeys:', this.journeys);
      },
      error: (err) => console.error('Error load journeys', err),
    });
  }

  viewDetail(journeyId: number) {
    this.router.navigate(['/journey', this.schedule?.Id, journeyId]);
  }

  openAddJourneyModal() {
    this.newJourneyName = '';
    this.visibleAddJourney = true;
  }

  closeAddJourneyModal() {
    this.visibleAddJourney = false;
  }

  saveNewJourney() {
    if (!this.newJourneyName.trim()) {
      alert('Vui lòng nhập tên hành trình.');
      return;
    }

    this.journeyService
      .createJourney({
        Name: this.newJourneyName,
        ScheduleId: this.schedule.Id,
        DepartureDateTime: this.newJourneyDateTime,
      })
      .subscribe({
        next: () => {
          this.closeAddJourneyModal();
          this.loadJourneys(this.schedule.Id);
        },
        error: (err) => console.error('Error tạo journey', err),
      });
  }

  deleteJourney(journeyId: number) {
    if (!confirm('Bạn có chắc muốn xóa chuyến tàu này không?')) {
      return;
    }

    this.journeyService.deleteJourney(journeyId).subscribe({
      next: () => {
        this.loadJourneys(this.schedule.Id);
      },
      error: (err) => console.error('Error xóa journey', err),
    });
  }
}
