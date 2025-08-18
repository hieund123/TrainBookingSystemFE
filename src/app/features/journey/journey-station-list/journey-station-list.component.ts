import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ButtonDirective,
  ButtonModule,
  CardModule,
  FormModule,
  ModalComponent,
  ModalModule,
  TableModule,
} from '@coreui/angular';
import { JourneyService } from '../services/journey.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-journey-station-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    ModalComponent,
    FormsModule,
    FormModule,
    ModalModule,
  ],
  templateUrl: './journey-station-list.component.html',
  styleUrl: './journey-station-list.component.scss',
})
export class JourneyStationListComponent {
  @Input() stations: any[] = [];
  @Input() journeyId!: number;
  @Output() stationsChanged = new EventEmitter<void>();

  visibleAddStation = false;
  newStation: any = {
    TrainStationId: null,
    StopOrder: 0,
    DepartureTime: '',
  };

  allStations: any[] = [];

  constructor(private journeyService: JourneyService) {}

  ngOnInit() {
    this.loadAllStations();
  }

  loadAllStations() {
    this.journeyService.getAllStations().subscribe({
      next: (res) => (this.allStations = res),
      error: (err) => console.error('Error load stations', err),
    });
  }

  openAddStationModal() {
    this.newStation = {
      TrainStationId: null,
      StopOrder: null,
      DepartureTime: '',
    };
    this.visibleAddStation = true;
  }

  closeAddStationModal() {
    this.visibleAddStation = false;
  }

  saveNewStation() {
    if (
      !this.newStation.TrainStationId ||
      !this.newStation.StopOrder ||
      !this.newStation.DepartureTime
    ) {
      alert('Vui lòng nhập đầy đủ TrainStationId, StopOrder và DepartureTime');
      return;
    }

    const payload = {
      TrainStationId: Number(this.newStation.TrainStationId),
      TrainJourneyId: this.journeyId,
      StopOrder: Number(this.newStation.StopOrder),
      DepartureTime: this.newStation.DepartureTime,
    };

    this.journeyService.addStationToJourney(payload).subscribe({
      next: () => {
        this.closeAddStationModal();
        this.stationsChanged.emit();
      },
      error: (err) => console.error('Error thêm station', err),
    });
  }

  removeStation(stationId: number) {
    if (!confirm('Bạn có chắc muốn xóa ga này không?')) return;

    this.journeyService
      .deleteStationFromJourney(this.journeyId, stationId)
      .subscribe({
        next: () => {
          alert('Xóa thành công!');
          this.stationsChanged.emit(); // reload parent
        },
        error: (err) => console.error('Error xóa station', err),
      });
  }
}
