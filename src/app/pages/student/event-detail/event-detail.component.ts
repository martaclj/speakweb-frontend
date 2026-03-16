import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { GroupEvent } from '../../../interfaces/group-event';
import { Group } from '../../../interfaces/group';
import { GroupMemberService } from '../../../services/group-member.service';
import { EventParticipantService } from '../../../services/event-participant.service';
import { MessagesService } from '../../../services/messages.service';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import { ParticipantCardComponent } from '../../../components/participant-card/participant-card.component';

@Component({
  selector: 'app-event-detail',
  imports: [DatePipe, RouterLink, ParticipantCardComponent],   // DatePipe para facilitar el trabajo con fechas
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {

  @Input() joined: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);
  private groupMemberService = inject(GroupMemberService);
  private participantService = inject(EventParticipantService);
  private userService = inject(UserService);
  private msgService = inject(MessagesService);


  event?: GroupEvent;
  isLoading: boolean = true;
  isGroupMember: boolean = false;
  isJoinedEvent: boolean = false;
  participants: any[] = [];
  myUserId: number = 0;

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.myUserId = user.id;
      },
      error: () => {} //
    });

    this.route.paramMap.subscribe(params => { //
      const id = Number(params.get('id'));
      if (id) {
        this.loadEvent(id);
        this.loadParticipants(id);
      }
    });
  }

  getImageUrl(url: string | undefined): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${environment.serverUrl}${url}`;
  }

  loadEvent(id: number) {
    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data;

        if (this.event) {
          this.checkPermissions(this.event.group.id);
          this.checkIfJoinedEvent(this.event.id);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar evento:", err);
        this.isLoading = false;
      }
    });
  }

  loadParticipants(id: number) {
    this.participantService.getParticipantsByEvent(id).subscribe({
      next: (data) => {
        this.participants = data;
      },
      error: (err) => {}
    });
  }

  checkPermissions(groupId: number) {
    this.groupMemberService.getMyGroups().subscribe(myGroups => {
      const found = myGroups.find(m => m.group.id === groupId);
      if (found) {
        this.isGroupMember = true;
      } else {
        this.isGroupMember = false;
      }
    });
  }
  checkIfJoinedEvent(eventId: number) {
    this.participantService.getMyEvents().subscribe(myEvents => {
      const found = myEvents.find((p: any) => p.event.id === eventId);
      
      if (found) {
        this.isJoinedEvent = true;
      } else {
        this.isJoinedEvent = false;
      }
    });
  }

  joinEvent() {
    if (!this.event) 
      return;

    this.participantService.joinEvent(this.event.id).subscribe({
      next: () => {
        // alert('¡Te has apuntado correctamente!');
        this.msgService.show('¡Te has apuntado!', 'success');
        this.isJoinedEvent = true;

        // al apuntarse, se recarga la lista para aparezca la persona
        if (this.event) {
        this.loadParticipants(this.event.id);
        }
      },
      error: (err) => {
        console.error(err);
        // alert('Error al apuntarse');
        this.msgService.show('Error al apuntarse', 'danger');
      }
    });
  }

  leaveEvent() {
    if (!this.event) return;

    const eventId = this.event.id;

    if(!confirm('¿Seguro que quieres desapuntarte?')) return;

    this.participantService.leaveEvent(eventId).subscribe({
      next: () => {
        this.isJoinedEvent = false;
        // alert('Te has desapuntado del evento');
        this.msgService.show('Te has desapuntado correctamente', 'success');
        this.loadParticipants(eventId);
      },
      error: (err) => {
        console.error(err);
        this.msgService.show('Error al desapuntarte', 'danger');
      }
    });
  }


  rateUser(userToRate: any) {
    if (!this.event || !userToRate) return;
    this.router.navigate(['/rate', userToRate.id, this.event.id]);
  }

}
