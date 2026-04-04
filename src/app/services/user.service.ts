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

/* Servicio de usuarios:
perfil propio (privado)
perfil público (utiliza id)
lista / borra (admin)
reputación (ratings y reportes)
*/

  // GET: /api/users/profile -> mi perfil
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  // PUT: /api/users/profile -> edito mi perfil
  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, user);
  }

  // GET: /api/users -> ADMIN: LISTA de usuarios
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

    // GET: /api/users/{id} -> perfil público (recibe id)
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // GET: /api/ratings/user/{id}/reputation - Reputación
  // uso environment.apiUrl para no duplicar "/users"
  getUserReputation(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/ratings/user/${id}/reputation`);
  }

  /* detalles de valoraciones 
  (para el admin / para el perfil privado propio)
  GET: /api/ratings/user/{id}/details (lista de estrellas y comentarios) */
  getUserRatingsDetailed(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/ratings/user/${id}/details`);
  }

  // GET: /api/reports/user/{id} (lista de denuncias)
  getUserReportsDetailed(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/reports/user/${id}`);
  }

  // DELETE: /api/users/** (solo admin)
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

}
