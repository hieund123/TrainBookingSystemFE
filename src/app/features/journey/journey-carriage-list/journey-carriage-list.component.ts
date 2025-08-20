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
  carriages: any[] = [];
  @Input() journeyId!: number;
  @Input() scheduleId!: number;
  @Output() carriagesChanged = new EventEmitter<void>();

  visibleAddCarriage = false;
  carriageClasses: CarriageClass[] = [];

  visibleEditPrice = false;
  editingCarriage: any = null;

  newCarriage: any = {
    CarriageClassId: null,
    Position: 1,
  };

  constructor(private journeyService: JourneyService) {}

  ngOnInit() {
    this.loadCarriageClasses();
    this.loadCarriages();
  }

  loadCarriageClasses() {
    this.journeyService.getAllCarriageClasses().subscribe({
      next: (res) => (this.carriageClasses = res),
      error: (err) => console.error('Error load CarriageClasses', err),
    });
  }

  loadCarriages() {
    this.journeyService.getCarriagesInJourney(this.journeyId).subscribe({
      next: (res) => {
        this.carriages = res;

        this.carriages.forEach((c) => {
          this.journeyService
            .getCarriagePrice(this.scheduleId, c.CarriageClassId)
            .subscribe({
              next: (price) => {
                c.Price = price.Price;
              },
              error: () => {
                c.Price = null;
              },
            });
        });
      },
      error: (err) => console.error('Error load carriages', err),
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
        this.loadCarriages();
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
        this.loadCarriages();
        this.carriagesChanged.emit();
      },
      error: (err) => console.error('Error xóa toa', err),
    });
  }

  openEditPriceModal(carriage: any) {
    this.editingCarriage = { ...carriage };
    this.visibleEditPrice = true;
  }

  closeEditPriceModal() {
    this.visibleEditPrice = false;
    this.editingCarriage = null;
  }

  saveEditPrice() {
    if (!this.editingCarriage || this.editingCarriage.Price == null) {
      alert('Vui lòng nhập giá hợp lệ.');
      return;
    }

    const payload = { Price: Number(this.editingCarriage.Price) };

    this.journeyService
      .updateCarriagePrice(
        this.scheduleId,
        this.editingCarriage.CarriageClassId,
        payload
      )
      .subscribe({
        next: () => {
          this.closeEditPriceModal();
          this.loadCarriages();
        },
        error: (err) => console.error('Error update price', err),
      });
  }
}
