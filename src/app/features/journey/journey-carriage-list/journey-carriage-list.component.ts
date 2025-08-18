import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonModule,
  CardModule,
  FormModule,
  ModalComponent,
  ModalModule,
  TableModule,
} from '@coreui/angular';
import { CarriageClass, JourneyService } from '../services/journey.service';

@Component({
  selector: 'app-journey-carriage-list',
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
  templateUrl: './journey-carriage-list.component.html',
  styleUrl: './journey-carriage-list.component.scss',
})
export class JourneyCarriageListComponent implements OnInit {
  @Input() carriages: any[] = [];
  @Input() journeyId!: number;
  @Output() carriagesChanged = new EventEmitter<void>();

  visibleAddCarriage = false;
  carriageClasses: CarriageClass[] = [];

  newCarriage: any = {
    CarriageClassId: null,
    Position: 1,
  };

  constructor(private journeyService: JourneyService) {}

  ngOnInit() {
    this.loadCarriageClasses();
  }

  loadCarriageClasses() {
    this.journeyService.getAllCarriageClasses().subscribe({
      next: (res) => (this.carriageClasses = res),
      error: (err) => console.error('Error load CarriageClasses', err),
    });
  }

  openAddCarriageModal() {
    this.newCarriage = {
      CarriageClassId: null,
      Position: this.carriages.length + 1,
    };
    this.visibleAddCarriage = true;
  }

  closeAddCarriageModal() {
    this.visibleAddCarriage = false;
  }

  saveNewCarriage() {
    if (!this.newCarriage.CarriageClassId || !this.newCarriage.Position) {
      alert('Vui lòng chọn loại toa và thứ tự.');
      return;
    }

    const payload = {
      TrainJourneyId: this.journeyId,
      CarriageClassId: Number(this.newCarriage.CarriageClassId),
      Position: Number(this.newCarriage.Position),
    };

    this.journeyService.insertJourneyCarriage(payload).subscribe({
      next: () => {
        this.closeAddCarriageModal();
        this.carriagesChanged.emit();
      },
      error: (err) => console.error('Error thêm toa', err),
    });
  }

  deleteCarriage(carriageId: number) {
    if (!confirm('Bạn có chắc muốn xóa toa này không?')) {
      return;
    }

    this.journeyService.deleteJourneyCarriage(carriageId).subscribe({
      next: () => {
        this.carriagesChanged.emit();
      },
      error: (err) => console.error('Error xóa toa', err),
    });
  }

  reloadCarriages() {
    this.journeyService.getCarriagesInJourney(this.journeyId).subscribe({
      next: (res) => {
        this.carriages = res;
      },
      error: (err) => console.error('Error load carriages', err),
    });
  }
}
