import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonDirective, TableDirective } from '@coreui/angular';
import {
  TrainStation,
  TrainStationService,
} from '../services/train-station.service';
import { EditStationComponent } from '../edit-station/edit-station.component';
import { ConfirmDeleteStationComponent } from '../confirm-delete-station/confirm-delete-station.component';
import { AddStationComponent } from '../add-station/add-station.component';

@Component({
  selector: 'app-list-station',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    ButtonDirective,
    EditStationComponent,
    ConfirmDeleteStationComponent,
    AddStationComponent
  ],
  templateUrl: './list-station.component.html',
  styleUrl: './list-station.component.scss',
})
export class ListStationComponent implements OnInit {
  stations: TrainStation[] = [];
  editingStation: any = null;
  deletingStation: any = null;
  addingStation: boolean = false;


  constructor(private staionService: TrainStationService) {}

  ngOnInit(): void {
    this.staionService.getAllStations().subscribe({
      next: (data) => (this.stations = data),
      error: (error) => console.error('Error fetching stations:', error),
    });
  }
  updateStation(newName: string, id: number) {
    // Gọi API PUT cập nhật
    this.staionService.updateStation(id, { StationName: newName }).subscribe({
      next: () => {
        const station = this.stations.find((s) => s.Id === id);
        if (station) station.StationName = newName;
        this.editingStation = null; // đóng modal
      },
      error: (err) => console.error(err),
    });
  }

  addStation(newName: string) {
  this.staionService.addStation({ StationName: newName }).subscribe({
    next: (res: any) => {
      this.stations.push(res);
      this.addingStation = false;
    },
    error: (err) => console.error('Lỗi thêm ga:', err),
  });
}


  deleteStation(id: number, force: boolean = false) {
    this.staionService.deleteStation(id, force).subscribe({
      next: (res: any) => {
        this.stations = this.stations.filter((s) => s.Id !== id);
        this.deletingStation = null;
      },
      error: (err) => {
        if (err.status === 409 && err.error.requiresConfirmation) {
          // API trả về yêu cầu xác nhận xóa (force = true)
          if (confirm(`${err.error.message}\nCó chắc muốn xóa?`)) {
            this.deleteStation(id, true);
          }
        } else {
          console.error('Xóa ga thất bại:', err);
        }
      },
    });
  }
}
