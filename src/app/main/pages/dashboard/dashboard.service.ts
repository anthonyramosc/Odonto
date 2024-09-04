
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
  private EVENTS_KEY = 'events';

  getEvents(): Observable<Event[]> {
    const events = this.getEventsFromLocalStorage();
    return of(events).pipe(
      tap(_ => console.log('Eventos obtenidos del localStorage')),
      catchError(this.handleError<Event[]>('getEvents', []))
    );
  }

  addEvent(event: Event): Observable<Event> {
    const events = this.getEventsFromLocalStorage();
    events.push(event);
    this.saveEventsToLocalStorage(events);
    return of(event).pipe(
      tap((newEvent: Event) => console.log(`added event w/ id=${newEvent.id}`)),
      catchError(this.handleError<Event>('addEvent'))
    );
  }

  private getEventsFromLocalStorage(): Event[] {
    const eventsJson = localStorage.getItem(this.EVENTS_KEY);
    return eventsJson ? JSON.parse(eventsJson) : [];
  }

  private saveEventsToLocalStorage(events: Event[]): void {
    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}