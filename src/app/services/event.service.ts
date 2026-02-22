import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GroupEvent } from '../interfaces/group-event';
import { NewEvent } from '../interfaces/new-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  constructor() { }

  // GET: /api/events/group/{groupId}
  getEventsByGroup(groupId: number): Observable<GroupEvent[]> {
    const url = `${this.baseUrl}/events/group/${groupId}`;
    return this.http.get<GroupEvent[]>(url);
  }

  // GET: /api/events/{id}
  getEventById(id: number): Observable<GroupEvent> {
    const url = `${this.baseUrl}/events/${id}`;
    return this.http.get<GroupEvent>(url);
  }

  // POST: /api/events
  // recibe NewEvent (i de Creación) y devuelve GroupEvent (i de Lectura)
  createEvent(eventData: NewEvent): Observable<GroupEvent> {
    const url = `${this.baseUrl}/events`;
    return this.http.post<GroupEvent>(url, eventData);
  }

  // DELETE: /api/events/{id}
  deleteEvent(id: number): Observable<any> {
    const url = `${this.baseUrl}/events/${id}`;
    return this.http.delete(url, { responseType: 'text' }); 
    // responseType: 'text' pq back devuelve una frase
  }

  // POST: /images/upload --> subir imagen física al servidor
  uploadImage(file: File): Observable<{imageUrl: string}> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.baseUrl}/images/upload`;
    return this.http.post<{imageUrl: string}>(url, formData);
  }
  
}
