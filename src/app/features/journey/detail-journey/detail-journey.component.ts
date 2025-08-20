import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JourneyService } from '../services/journey.service';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  CardModule,
  FormModule,
  ModalComponent,
  ModalModule,
  TableModule,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { JourneyStationListComponent } from '../journey-station-list/journey-station-list.component';
import { JourneyCarriageListComponent } from '../journey-carriage-list/journey-carriage-list.component';

@Component({
  selector: 'app-detail-journey',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    FormsModule,
    FormModule,
    ModalModule,
    JourneyStationListComponent,
    JourneyCarriageListComponent,
  ],
  templateUrl: './detail-journey.component.html',
  styleUrl: './detail-journey.component.scss',
})
export class DetailJourneyComponent {
  scheduleId!: number;
  journeyId!: number;

  journey: any;
  journeyStations: any[] = [];
  carriages: any[] = [];

  stations: any[] = [];
  visibleAddStation = false;
  newStation: any = {
    TrainStationId: null,
    StopOrder: 0,
    DepartureTime: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private journeyService: JourneyService
  ) {}
  ngOnInit(): void {
    this.scheduleId = +this.route.snapshot.paramMap.get('scheduleId')!;
    this.journeyId = +this.route.snapshot.paramMap.get('journeyId')!;

    console.log('ScheduleId:', this.scheduleId);
    console.log('JourneyId:', this.journeyId);

    this.loadJourneyDetail();
    this.loadJourneyStations();
    this.loadCarriages();
  }

  loadJourneyDetail() {
    this.journeyService.getJourneyById(this.journeyId).subscribe({
      next: (data) => (this.journey = data),
      error: (err) => console.error('Error load journey', err),
    });
  }

  loadJourneyStations() {
    this.journeyService.getStationsByJourneyId(this.journeyId).subscribe({
      next: (stations) => (this.journeyStations = stations),
      error: (err) => console.error('Error load stations', err),
    });
  }

  loadCarriages() {
    this.journeyService.getCarriagesInJourney(this.journeyId).subscribe({
      next: (carriages) => (this.carriages = carriages),
      error: (err) => console.error('Error load carriages', err),
    });
  }

  goBack() {
    this.router.navigate([`/journey/${this.scheduleId}`]);
  }
}
