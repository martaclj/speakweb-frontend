import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { NewEvent } from '../../../interfaces/new-event';

@Component({
  selector: 'app-create-event',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  private eventService = inject(EventService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  newEvent: NewEvent = {
    title: '',
    description: '',
    startTime: '',
    location: '',
    imageUrl: '',
    externalLink: '',
    groupId: 0
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const groupId = Number(params.get('groupId'));
      if (groupId) {
        this.newEvent.groupId = groupId;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit() {
    if (!this.newEvent.title || !this.newEvent.startTime ) {
      alert('Por favor rellena el título y la fecha');
      return;
    }
    this.eventService.createEvent(this.newEvent).subscribe({
      next: () => {
        alert('¡Evento creado con éxito!');
        this.router.navigate(['/group', this.newEvent.groupId]);
      },
      error: (err) => {
        console.error('Error al crear:', err);
        alert('Error. Comprueba que eres Experto o Admin.');
      }
    });
  }
}