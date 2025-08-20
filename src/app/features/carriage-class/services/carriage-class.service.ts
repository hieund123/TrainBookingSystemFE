import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CarriageClass {
  Id: number;
  CarriageName: string;
  SeatingCapacity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarriageClassService {
  private readonly apiUrl = 'https://localhost:7117/api/CarriageClass';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CarriageClass[]> {
    return this.http.get<CarriageClass[]>(`${this.apiUrl}/GetAll`);
  }

  getById(id: number): Observable<CarriageClass> {
    return this.http.get<CarriageClass>(`${this.apiUrl}/${id}`);
  }

  create(
    carriageClass: Omit<CarriageClass, 'Id'>
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, carriageClass);
  }

  update(
    id: number,
    carriageClass: Omit<CarriageClass, 'Id'>
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.apiUrl}/${id}`,
      carriageClass
    );
  }

  delete(id: number, force: boolean = true): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${id}?force=${force}`
    );
  }
}
