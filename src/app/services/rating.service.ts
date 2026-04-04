// servicio valorar otros usuarios después de un evento
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/ratings`;

  constructor() { }
  
  // POST: /api/ratings - crea una valoración de 1-5 estrellas + comentario
  createRating(ratingData: any): Observable<any> {
    return this.http.post(this.baseUrl, ratingData);
  }
}
