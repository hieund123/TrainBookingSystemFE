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
  selector: 'app-confirm-delete-station',
  standalone: true,
  imports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    ModalToggleDirective,
  ],
  templateUrl: './confirm-delete-station.component.html',
  styleUrl: './confirm-delete-station.component.scss',
})
export class ConfirmDeleteStationComponent {
  @Input() stationName!: string;
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}
