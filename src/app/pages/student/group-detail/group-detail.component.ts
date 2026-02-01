import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../interfaces/group';
import { EventService } from '../../../services/event.service';
import { GroupEvent } from '../../../interfaces/group-event';
import { EventCardComponent } from '../../../components/event-card/event-card.component';
import { GroupMemberService } from '../../../services/group-member.service';
import { EventParticipantService } from '../../../services/event-participant.service';
import { GroupMember } from '../../../interfaces/group-member';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-group-detail',
  imports: [RouterLink, EventCardComponent],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private groupService = inject(GroupService);
  private eventService = inject(EventService);
  private groupMemberService = inject(GroupMemberService);
  private participantService = inject(EventParticipantService);

  private msgService = inject(MessagesService);

  group?: Group;
  events: GroupEvent[] = [];
  isLoading: boolean = true;
  canCreateEvent: boolean = false;
  myJoinedEventsId: number[] = []; 
  // array para guardar los ids de los eventos a los que ya apuntado
  members: GroupMember[] = []; //lista de miembros

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (id) {
        this.loadGroup(id);
        this.loadEvents(id);
        this.checkPermissions(id);
        this.loadMyParticipations();
        this.loadMembers(id);
      }
    });
  }
  loadMembers(id: number) {
    this.groupMemberService.getMembersByGroup(id).subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (err) => console.error("Error cargando miembros", err)
    });
  }

  loadGroup(id: number) {
    this.groupService.getGroupById(id).subscribe({
      next: (data) => {
        console.log("Datos del grupo cargados:", data);
        this.group = data;
        this.isLoading = false;
      }
    });
  }

    loadEvents(id: number) {
    this.eventService.getEventsByGroup(id).subscribe({
      next: (data) => {
        console.log("Eventos cargados:", data);
        this.events = data;
      },
      error: (err) => {
        console.error("Error cargando eventos:", err);
      }
    });
  }

  checkPermissions(groupId: number) {
    this.groupMemberService.getMyStatusInGroup(groupId).subscribe({

      next: (member: any) => {
        if (member && member.expert) {
          this.canCreateEvent = true;
        }
      },
      error: () => {
        this.canCreateEvent = false;
      }
    });
  }
  
  loadMyParticipations() {
   this.participantService.getMyEvents().subscribe({
    next: (data: any[]) => {
      this.myJoinedEventsId = data.map(p => p.event.id);
    }
   }) 
  }

  // función para el html: saber si apuntado
  isJoined(eventId: number): boolean {
    return this.myJoinedEventsId.includes(eventId);
  }

  leaveGroup() {
    // si grupo no existe!
    if (!this.group) 
      return;

    if (confirm(`¿Seguro que quieres abandonar el grupo ${this.group.name}?`)) {
      this.groupMemberService.leaveGroup(this.group.id).subscribe({
        next: () => {
          this.msgService.show('Grupo abandonado', 'success');
          // alert('Has abandonado el grupo');
          this.router.navigate(['/home']);
        }, // si abandona el grupo --> ya no lo ve y vuelve a la Home
        error: (err) => alert('Error al salir del grupo')
      });
    }
  }

  // función para las banderas de los idiomas
  getFlagEmoji(code: string): string {
    if (!code) return '🌏';

    const upperCode = code.toUpperCase();

    const flags: { [key: string]: string } = {
      'ES': '🇪🇸',
      'EN': '🇬🇧',
      'FR': '🇫🇷',
      'DE': '🇩🇪',
      'IT': '🇮🇹',
      'PT': '🇵🇹',
      'JA': '🇯🇵'
    }; // ampliar
    // añadir a la database

    return flags[upperCode] || '🌏';
  }

}
