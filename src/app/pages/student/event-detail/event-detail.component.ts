import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { GroupEvent } from '../../../interfaces/group-event';
import { Group } from '../../../interfaces/group';
import { GroupMemberService } from '../../../services/group-member.service';
import { EventParticipantService } from '../../../services/event-participant.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-event-detail',
  imports: [DatePipe, RouterLink],   // DatePipe para facilitar el trabajo con fechas
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);
  private groupMemberService = inject(GroupMemberService);
  private participantService = inject(EventParticipantService);

  private msgService = inject(MessagesService);


  event?: GroupEvent;
  isLoading: boolean = true;
  isGroupMember: boolean = false;
  isJoinedEvent: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadEvent(id);
      }
    });
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
      },
      error: (err) => {
        console.error(err);
        // alert('Error al apuntarse');
        this.msgService.show('Error al apuntarse', 'danger');
      }
    });
  }

}
