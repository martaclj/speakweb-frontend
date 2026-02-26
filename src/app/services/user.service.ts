import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  constructor() { }

  // GET: /api/users/profile
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  // PUT: /api/users/profile
  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, user);
  }

  // GET: /api/users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

    // GET: /api/users/{id}
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // GET: /api/ratings/user/{id}/reputation
  // uso environment.apiUrl para no duplicar "/users"
  getUserReputation(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/ratings/user/${id}/reputation`);
  }

  // GET: /api/ratings/user/{id}/details (lista de estrellas y comentarios)
  getUserRatingsDetailed(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/ratings/user/${id}/details`);
  }

  // GET: /api/reports/user/{id} (lista de denuncias)
  getUserReportsDetailed(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/reports/user/${id}`);
  }

  // DELETE: /api/users/**
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

}
