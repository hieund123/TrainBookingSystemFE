import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BookingHistory {
  Id: number;
  TicketNo: string;
  SeatNo: string;
  BookingDate: string;
  AmountPaid: number;
  Status: string;
  StartingStationName: string;
  EndingStationName: string;
  TrainName: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingHistoryService {
  private baseUrl = 'https://localhost:7117/api/';

  constructor(private http: HttpClient) {}

  getByUser(userId: string): Observable<BookingHistory[]> {
    return this.http.get<BookingHistory[]>(
      `${this.baseUrl}Booking/GetByUser?userId=${userId}`
    );
  }

  getBookingDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}Booking/Detail/${id}`);
  }

  getJourneyStations(journeyId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}JourneyStation/by-journey/${journeyId}`
    );
  }
  cancelBooking(bookingId: number) {
    return this.http.post<any>(
      `${this.baseUrl}Booking/Cancel/${bookingId}`,
      {}
    );
  }
}
