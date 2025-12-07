import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  // inyección de dependencia
  private http = inject(HttpClient);

  // url de mi API
  private apiUrl ='http://localhost:8080/api/groups';

  constructor() { }

  // método get recupero todos los grupos disponibles
  getAllGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
