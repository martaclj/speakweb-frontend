import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/images`;

  constructor() { }

    // POST: /images/upload --> subir imagen ¡de perfil! física al servidor
  uploadImage(file: File): Observable<{imageUrl: string}> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.apiUrl}/upload`;
    return this.http.post<{imageUrl: string}>(url, formData);
  }
}
