
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Event {
  id: string;
  fullname: string;
  identification: string;
  phone: string;
  email: string;
  doctor: string;
  date: string;
  time: string;
  referral: string;
  reason: string;
  observations: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private eventsUrl = 'app/main/pages/dashboard/dashboard.json'; 

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl)
      .pipe(
        tap(_ => console.log('Eventos obtenidos del archivo dashboard.json')),
        catchError(this.handleError<Event[]>('getEvents', []))
      );
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, event)
      .pipe(
        tap((newEvent: Event) => console.log(`added event w/ id=${newEvent.id}`)),
        catchError(this.handleError<Event>('addEvent'))
      );
      
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}