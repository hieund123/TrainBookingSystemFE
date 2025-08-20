import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Schedule {
  Id: number;
  Name: string;
  TrainJourneys: any[];
  CarriagePrices: any[];
}
export interface Journey {
  Id: number;
  Name: string;
  DateTime: string;
  ScheduleId: number;
  ScheduleName: string;
}

export interface CarriageClass {
  Id: number;
  CarriageName: string;
  SeatingCapacity: number;
}

export interface JourneyCarriagePayload {
  TrainJourneyId: number;
  CarriageClassId: number;
  Position: number;
}

export interface JourneyCreatePayload {
  Name: string;
  ScheduleId: number;
  DepartureDateTime: string;
}

export interface CarriagePrice {
  ScheduleId: number;
  ScheduleName: string;
  CarriageClassId: number;
  CarriageClassName: string;
  Price: number;
}

export interface CarriagePriceCreatePayload {
  ScheduleId: number;
  CarriageClassId: number;
  Price: number;
}

export interface CarriagePriceUpdatePayload {
  Price: number;
}

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  private baseUrl = 'https://localhost:7117/api';

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.baseUrl}/Schedule`);
  }

  getScheduleById(scheduleId: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.baseUrl}/Schedule/${scheduleId}`);
  }

  getJourneysByScheduleId(scheduleId: number): Observable<Journey[]> {
    return this.http.get<Journey[]>(
      `${this.baseUrl}/TrainJourney/by-schedule/${scheduleId}`
    );
  }

  getJourneyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/TrainJourney/${id}`);
  }

  getCarriagesInJourney(journeyId: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/JourneyCarriage/GetCarriagesInJourney/${journeyId}`
    );
  }

  getStationsByJourneyId(journeyId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/JourneyStation/by-journey/${journeyId}`
    );
  }

  addStationToJourney(payload: any) {
    return this.http.post(`${this.baseUrl}/JourneyStation`, payload);
  }

  getAllStations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/TrainStation/GetAllStations`);
  }

  deleteStationFromJourney(journeyId: number, stationId: number) {
    return this.http.delete(
      `${this.baseUrl}/JourneyStation/${journeyId}/${stationId}`
    );
  }

  getAllCarriageClasses(): Observable<CarriageClass[]> {
    return this.http.get<CarriageClass[]>(
      `${this.baseUrl}/CarriageClass/GetAll`
    );
  }

  insertJourneyCarriage(payload: JourneyCarriagePayload): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/JourneyCarriage/InsertJourneyCarriage`,
      payload
    );
  }

  deleteJourneyCarriage(journeyCarriageId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/JourneyCarriage/${journeyCarriageId}`
    );
  }

  createJourney(payload: JourneyCreatePayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/TrainJourney`, payload);
  }

  deleteJourney(journeyId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/TrainJourney/${journeyId}`);
  }

  // Lấy tất cả CarriagePrice
  getCarriagePrices(): Observable<CarriagePrice[]> {
    return this.http.get<CarriagePrice[]>(`${this.baseUrl}/CarriagePrice`);
  }

  // Tạo mới CarriagePrice
  createCarriagePrice(payload: CarriagePriceCreatePayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/CarriagePrice`, payload);
  }

  // Lấy chi tiết CarriagePrice theo ScheduleId + CarriageClassId
  getCarriagePrice(
    scheduleId: number,
    carriageClassId: number
  ): Observable<CarriagePrice> {
    return this.http.get<CarriagePrice>(
      `${this.baseUrl}/CarriagePrice/${scheduleId}/${carriageClassId}`
    );
  }

  // Cập nhật CarriagePrice
  updateCarriagePrice(
    scheduleId: number,
    carriageClassId: number,
    payload: CarriagePriceUpdatePayload
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/CarriagePrice/${scheduleId}/${carriageClassId}`,
      payload
    );
  }
}
