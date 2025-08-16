import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TrainJourney {
  Id: number;
  Name: string;
  DateTime: string;
  ScheduleId: number;
  ScheduleName: string;
}

export interface Schedule {
  Id: number;
  Name: string;
}

export interface TrainStation {
  Id: number;
  StationName: string;
}

export interface CarriageClass {
  Id: number;
  CarriageName: string;
  SeatingCapacity: number;
}


@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'https://localhost:7117/api';

  constructor(private http: HttpClient) {}

  // Lấy danh sách toa của hành trình
  getCarriagesInJourney(journeyId: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/JourneyCarriage/GetCarriagesInJourney/${journeyId}`
    );
  }

  // Lấy danh sách ghế trống theo journeyId và carriageClassId
  getAvailableSeats(
    journeyId: number,
    carriageClassId: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('journeyId', journeyId)
      .set('carriageClassId', carriageClassId);

    return this.http.get<any>(`${this.baseUrl}/Booking/AvailableSeats`, {
      params,
    });
  }

  // Lấy thông tin toa theo ID
  getCarriageClassById(carriageClassId: number): Observable<any> {
    return this.http.get<CarriageClass>(
      `${this.baseUrl}/CarriageClass/${carriageClassId}`
    );
  }

  createBooking(data: {
    UserId: string;
    TrainJourneyId: number;
    StartingTrainStationId: number;
    EndingTrainStationId: number;
    CarriageClassId: number;
    SeatNo: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Booking/Create`, data);
  }

  getCarriagePrice(scheduleId: number, carriageClassId: number) {
    return this.http.get<any>(
      `${this.baseUrl}/CarriagePrice/${scheduleId}/${carriageClassId}`
    );
  }

  getJourneyById(journeyId: number) {
    return this.http.get<TrainJourney>(`${this.baseUrl}/TrainJourney/${journeyId}`);
  }

  getScheduleById(scheduleId: number) {
    return this.http.get<Schedule>(`${this.baseUrl}/Schedule/${scheduleId}`);
  }

  getStationById(stationId: number) {
    return this.http.get<TrainStation>(`${this.baseUrl}/TrainStation/${stationId}`);
  }

  getJourneyCarriageById(journeyCarriageId: number) {
    return this.http.get<any>(
      `${this.baseUrl}/JourneyCarriage/${journeyCarriageId}`
    );
  }
}
