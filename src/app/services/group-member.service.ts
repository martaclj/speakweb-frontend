import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GroupMember } from '../interfaces/group-member';

@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/group-members`;

  constructor() { }

  // GET: /api/group-members/my-groups"
  getMyGroups(): Observable<GroupMember[]> {
    return this.http.get<GroupMember[]>(`${this.baseUrl}/my-groups`);
  }

  // GET: /api/group-members/status/{groupId}
  getMyStatusInGroup(groupId: number): Observable<GroupMember> {
    return this.http.get<GroupMember>(`${this.baseUrl}/status/${groupId}`);
  }

  // POST: /api/group-members/group/{groupId}
  joinGroup(groupId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/join`, { groupId });
  }

}
