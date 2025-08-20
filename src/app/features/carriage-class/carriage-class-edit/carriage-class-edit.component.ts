import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalTitleDirective,
  ButtonDirective,
  ButtonCloseDirective,
} from '@coreui/angular';
import { CarriageClass, CarriageClassService } from '../services/carriage-class.service';

@Component({
  selector: 'app-carriage-class-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonDirective,
    ButtonCloseDirective,
  ],
  templateUrl: './carriage-class-edit.component.html',
})
export class CarriageClassEditComponent {
  @Input() carriage!: CarriageClass;
  @Output() updated = new EventEmitter<void>();

  isModalOpen = false;

  form = this.fb.group({
    CarriageName: ['', Validators.required],
    SeatingCapacity: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private carriageClassService: CarriageClassService
  ) {}

  toggleModal() {
    if (!this.isModalOpen && this.carriage) {
      // Khi mở modal, load dữ liệu hiện tại vào form
      this.form.patchValue({
        CarriageName: this.carriage.CarriageName,
        SeatingCapacity: this.carriage.SeatingCapacity,
      });
    }
    this.isModalOpen = !this.isModalOpen;
  }

  onModalChange(event: boolean) {
    this.isModalOpen = event;
  }

  submit() {
    if (this.form.invalid || !this.carriage) return;

    const payload = {
      CarriageName: this.form.value.CarriageName ?? '',
      SeatingCapacity: this.form.value.SeatingCapacity ?? 0,
    };

    this.carriageClassService.update(this.carriage.Id, payload).subscribe({
      next: () => {
        alert('Cập nhật thành công!');
        this.updated.emit();
        this.toggleModal();
      },
      error: () => {
        alert('Cập nhật thất bại!');
      },
    });
  }
}
