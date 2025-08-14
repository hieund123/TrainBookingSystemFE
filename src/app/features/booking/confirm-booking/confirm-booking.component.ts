import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class ConfirmBookingComponent {
  @Input() seatNo: string | null = null;
  @Output() confirmed = new EventEmitter<void>();
}
