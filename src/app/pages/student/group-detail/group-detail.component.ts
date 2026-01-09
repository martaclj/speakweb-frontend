import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../interfaces/group';
import { EventService } from '../../../services/event.service';
import { GroupEvent } from '../../../interfaces/group-event';
import { EventCardComponent } from '../../../components/event-card/event-card.component';
import { GroupMemberService } from '../../../services/group-member.service';

@Component({
  selector: 'app-group-detail',
  imports: [RouterLink, EventCardComponent],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private groupService = inject(GroupService);
  private eventService = inject(EventService);
  private groupMemberService = inject(GroupMemberService);

  group?: Group;
  events: GroupEvent[] = [];
  isLoading: boolean = true;

  canCreateEvent: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (id) {
        this.loadGroup(id);
        this.loadEvents(id);
        this.checkPermissions(id);
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
    }; // ampliar según se vayan necesitando

    return flags[upperCode] || '🌏';
  }

}
