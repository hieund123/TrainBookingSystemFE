import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  ButtonDirective,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalToggleDirective,
  FormModule
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-station',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormModule,
    ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent
  ],
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.scss']
})
export class EditStationComponent {
  @Input() stationName: string = '';
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.stationName);
  }

  onCancel() {
    this.cancel.emit();
  }
}
