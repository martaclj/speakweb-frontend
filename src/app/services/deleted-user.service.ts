import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DeletedUser } from '../interfaces/deleted-user';

@Injectable({
  providedIn: 'root'
})
export class DeletedUserService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/deleted-users`;

  // GET: /api/deleted-users
  getAllDeletedUsers(): Observable<DeletedUser[]> {
    return this.http.get<DeletedUser[]>(this.apiUrl);
  }

  constructor() { }
}
