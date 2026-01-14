import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserLanguage } from '../interfaces/user-language';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLanguageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/user-languages`;

  constructor() { }

  getMyLanguages(): Observable<UserLanguage[]> {
    return this.http.get<UserLanguage[]>(this.apiUrl);
  }

  addLanguage(languageId: number, level: string, type: string): Observable<UserLanguage> {
    const body = { languageId, level, type };
    return this.http.post<UserLanguage>(this.apiUrl, body);
  }

  deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

}
