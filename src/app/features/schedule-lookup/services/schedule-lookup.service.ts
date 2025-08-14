import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TrainStation {
  Id: number;
  StationName: string;
  JourneyStations: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleLookupService {
  private apiUrl = 'https://localhost:7117/api/TrainStation'; // base URL

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các ga tàu
  getAllStations(): Observable<TrainStation[]> {
    return this.http.get<TrainStation[]>(`${this.apiUrl}/GetAllStations`);
  }

  // Lấy thông tin ga tàu theo id
  getStationById(id: number): Observable<TrainStation> {
    return this.http.get<TrainStation>(`${this.apiUrl}/${id}`);
  }

  searchJourneys(
    departureDate: string,
    startStationId: number,
    endStationId: number
  ) {
    return this.http.get<any>(
      `https://localhost:7117/api/TrainJourney/search`,
      {
        params: {
          departureDate,
          startStationId: startStationId.toString(),
          endStationId: endStationId.toString(),
        },
      }
    );
  }

  getJourneyById(id: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7117/api/TrainJourney/${id}`);
  }

  getStationsByJourneyId(journeyId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `https://localhost:7117/api/JourneyStation/by-journey/${journeyId}`
    );
  }

  getCarriagesInJourney(journeyId: number) {
  return this.http.get<any[]>(
    `https://localhost:7117/api/JourneyCarriage/GetCarriagesInJourney/${journeyId}`
  );
}

}
