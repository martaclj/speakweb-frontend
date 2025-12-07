import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Group } from '../interfaces/group';
import { GroupMember } from '../interfaces/group-member';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  // inyección de dependencia
  private http = inject(HttpClient);

  // url de mi API de la variable environment
  private baseUrl = environment.apiUrl;

  constructor() { }

  // GET: /api/groups
  // método get recupero todos los grupos disponibles
  getAllGroups(): Observable<Group[]> {
    const url = `${this.baseUrl}/groups`;
    return this.http.get<any[]>(url);
  }

  // POST: /api/group-members/join
  // método para unirse a un grupo
  joinGroup(groupId: number): Observable<any> {
    const url = `${this.baseUrl}/group-members/join`;
    const body = { groupId: groupId };

    return this.http.post(url, body);
  }

  getMyGroups(): Observable<GroupMember[]> {
    const url = `${this.baseUrl}/group-members/my-groups`;
    return this.http.get<GroupMember[]>(url);
  }

}
