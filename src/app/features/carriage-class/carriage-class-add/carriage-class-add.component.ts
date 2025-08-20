import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  ButtonDirective,
  ButtonCloseDirective,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalBodyComponent,
  ModalFooterComponent,
} from '@coreui/angular';
import { CarriageClassService } from '../services/carriage-class.service';

@Component({
  selector: 'app-carriage-class-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonDirective,
    ButtonCloseDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ModalFooterComponent,
  ],
  templateUrl: './carriage-class-add.component.html',
})
export class CarriageClassAddComponent {
  isModalOpen = false;
  @Output() created = new EventEmitter<void>();

  form = this.fb.group({
    CarriageName: ['', Validators.required],
    SeatingCapacity: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private carriageClassService: CarriageClassService
  ) {}

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  onModalChange(event: boolean) {
    this.isModalOpen = event;
  }

  submit() {
    if (this.form.invalid) return;

    const payload = {
      CarriageName: this.form.value.CarriageName ?? '',
      SeatingCapacity: this.form.value.SeatingCapacity ?? 0,
    };

    this.carriageClassService.create(payload).subscribe({
      next: () => {
        alert('Thêm loại toa thành công!');
        this.created.emit();
        this.toggleModal();
      },
      error: () => {
        alert('Thêm thất bại!');
      },
    });
  }
}
