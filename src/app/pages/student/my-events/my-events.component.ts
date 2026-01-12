import { Component, inject, OnInit } from '@angular/core';
import { EventCardComponent } from '../../../components/event-card/event-card.component';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { GroupEvent } from '../../../interfaces/group-event';
import { EventParticipantService } from '../../../services/event-participant.service';

@Component({
  selector: 'app-my-events',
  imports: [EventCardComponent, RouterLink],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent {
  private eventService = inject(EventService);
  private participantService = inject(EventParticipantService);

  myEvents: GroupEvent[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadMyEvents();
  }
  loadMyEvents() {
    this.participantService.getMyEvents().subscribe({
      next: (data: any[]) => {
        this.myEvents = data.map(p => p.event);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error cargando agenda:", err);
        this.isLoading = false;
      }
    });
  }
}
