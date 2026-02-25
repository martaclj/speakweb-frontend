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
  
  createRating(ratingData: any): Observable<any> {
    return this.http.post(this.baseUrl, ratingData);
  }
}
