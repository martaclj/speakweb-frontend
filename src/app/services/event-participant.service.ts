import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventParticipantService {

  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/event-participants`;

  constructor() { }

  // POST: apuntarse a un evento
  joinEvent(eventId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/join`, { eventId });
  }

  // GET: ver mis eventos
  getMyEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my-events`);
  }

  // Get: ver participantes de 1 evento concreto
  getParticipantsByEvent(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/event/${eventId}`);
  }

  // DELETE
  leaveEvent(eventId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/leave/${eventId}`, { responseType: 'text' });
  }
}
