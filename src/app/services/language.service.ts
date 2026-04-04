// service gestión de idiomas general
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Language } from '../interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/languages`;

  constructor() { }

  // lista todos los idiomas disponibles
  // GET /api/languages
  getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.apiUrl);
  }
  // GET /api/languages/{id}
  // un idioma por id
  getLanguageById(id: number): Observable<Language> {
    return this.http.get<Language>(`${this.apiUrl}/${id}`);
  }
  // POST /api/languages
  // crea idioma nuevo (admin)
  save(language: any): Observable<Language> {
    return this.http.post<Language>(this.apiUrl, language);
  }
  // DELETE /api/languages/{id}
  // borra idioma del sistema (admin)
  deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
