import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TrainStation {
  Id: number;
  StationName: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrainStationService {
  private apiUrl = 'https://localhost:7117/api/TrainStation';

  constructor(private http: HttpClient) {}

  // Lấy tất cả ga
  getAllStations(): Observable<TrainStation[]> {
    return this.http.get<TrainStation[]>(`${this.apiUrl}/GetAllStations`);
  }

  // Lấy ga theo id
  getStationById(id: number): Observable<TrainStation> {
    return this.http.get<TrainStation>(`${this.apiUrl}/${id}`);
  }

  // Thêm ga mới
  addStation(station: { StationName: string }): Observable<TrainStation> {
    return this.http.post<TrainStation>(this.apiUrl, station);
  }

  // Cập nhật ga
  updateStation(id: number, station: { StationName: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, station);
  }

  // Xóa ga
  deleteStation(id: number, force: boolean = false): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}?force=${force}`);
  }
}
