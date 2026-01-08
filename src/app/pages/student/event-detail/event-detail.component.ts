import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { GroupEvent } from '../../../interfaces/group-event';
import { Group } from '../../../interfaces/group';

@Component({
  selector: 'app-event-detail',
  imports: [DatePipe, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);
  // DatePipe para facilitar el trabajo con fechas

  event?: GroupEvent;
  isLoading: boolean = true;

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
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar evento:", err);
        this.isLoading = false;
      }
    });
  }

}
