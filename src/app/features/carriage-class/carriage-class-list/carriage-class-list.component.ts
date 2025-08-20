import { Component } from '@angular/core';
import {
  CarriageClass,
  CarriageClassService,
} from '../services/carriage-class.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  BadgeModule,
  ButtonDirective,
  ModalModule,
  TableDirective,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { CarriageClassAddComponent } from '../carriage-class-add/carriage-class-add.component';
import { CarriageClassEditComponent } from '../carriage-class-edit/carriage-class-edit.component';

@Component({
  selector: 'app-carriage-class-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableDirective,
    BadgeModule,
    TabsModule,
    ModalModule,
    ButtonDirective,
    CarriageClassAddComponent,
    CarriageClassEditComponent
  ],
  templateUrl: './carriage-class-list.component.html',
  styleUrls: ['./carriage-class-list.component.scss'],
})
export class CarriageClassListComponent {
  carriageClasses: CarriageClass[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private carriageClassService: CarriageClassService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.carriageClassService.getAll().subscribe({
      next: (data) => {
        this.carriageClasses = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Không thể tải dữ liệu!';
        this.isLoading = false;
      },
    });
  }

  deleteCarriage(id: number) {
    if (confirm('Bạn có chắc muốn xóa loại toa này?')) {
      this.carriageClassService.delete(id).subscribe({
        next: () => {
          alert('Xóa thành công!');
          this.loadData();
        },
        error: () => {
          alert('Xóa thất bại!');
        },
      });
    }
  }
}
