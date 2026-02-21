import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { NewEvent } from '../../../interfaces/new-event';
import { MessagesService } from '../../../services/messages.service';

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
  // para los alerts
  private msgService = inject(MessagesService);

  newEvent: NewEvent = {
    title: '',
    description: '',
    startTime: '',
    imageUrl: '',
    groupId: 0,
    type: 'PRESENTIAL', // valor por defecto
    location: '',
    externalLink: ''
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
      // alert('Por favor rellena el título y la fecha');
      this.msgService.show('Rellena el título y la fecha', 'danger');
      return;
    }
    this.eventService.createEvent(this.newEvent).subscribe({
      next: () => {
        // alert('¡Evento creado con éxito!');
        this.msgService.show('¡Evento creado!', 'success');
        this.router.navigate(['/group', this.newEvent.groupId]);
      },
      error: (err) => {
        console.error('Error al crear:', err);
        // alert('Error. Comprueba que eres Experto o Admin.');
        this.msgService.show('¡Error. comprueba si eres Experto o Admin.!', 'danger');
      }
    });
  }
}