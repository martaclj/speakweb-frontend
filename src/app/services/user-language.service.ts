// service gestión idiomas del usuario y de otros usuarios
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserLanguage } from '../interfaces/user-language';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserLanguageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/user-languages`;

  constructor() { }

  // GET /api/user-languages
  // mis idiomas
  getMyLanguages(): Observable<UserLanguage[]> {
    return this.http.get<UserLanguage[]>(this.apiUrl);
  }

  // idiomas de otro usuario
  // GET: /api/user-languages/user/{userId}
  getUserLanguages(userId: number): Observable<UserLanguage[]> {
    return this.http.get<UserLanguage[]>(`${this.apiUrl}/user/${userId}`);
  }

  // añadir idioma a mi perfil
  // POST: /api/user-languages
  addLanguage(languageId: number, level: string, type: string): Observable<UserLanguage> {
    const body = { languageId, level, type };
    return this.http.post<UserLanguage>(this.apiUrl, body);
  }

  // quitar idioma de mi perfil
  // DELETE: /api/user-languages/{id}
  deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

}
