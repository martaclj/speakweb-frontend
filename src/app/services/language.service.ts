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

  getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.apiUrl);
  }

  getLanguageById(id: number): Observable<Language> {
    return this.http.get<Language>(`${this.apiUrl}/${id}`);
  }

  save(language: any): Observable<Language> {
    return this.http.post<Language>(this.apiUrl, language);
  }

  deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
