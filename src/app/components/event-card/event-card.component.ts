import { Component, inject, Input } from '@angular/core';
// para el manejo de fechas
import { DatePipe, UpperCasePipe } from '@angular/common';
import { GroupEvent } from '../../interfaces/group-event';
import { EventParticipantService } from '../../services/event-participant.service';
import { MessagesService } from '../../services/messages.service';
import { RouterLink } from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, UpperCasePipe, RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  @Input({ required: true }) event!: GroupEvent;
  @Input() joined: boolean = false;

  private participantService = inject(EventParticipantService);
  private msgService = inject(MessagesService);

  getEventImageUrl(url: string | undefined): string {
    if(!url) {
      return ''; // no hay imagen
    }
    if (url.startsWith('http')) {
      return url; // imagen internet
    }
    // archivo físico
    return `${environment.serverUrl}${url}`;
  }

  // función para saber si el evento online ya está abierto
  isEventOpen(): boolean {
    if (!this.event || !this.event.startTime) {
      return false;
    }

    // comprobar la fecha actual
    const now = new Date();
    // de String a Date
    const eventTime = new Date(this.event.startTime);

    // evento se abre 15 minutos antes de la hora
    const openTime = new Date(eventTime.getTime() - (15 * 60000));

    // comparación de la hora actual y la de apertura
    return now >= openTime;
  }

  onRegister() {
    this.participantService.joinEvent(this.event.id).subscribe({
      next: () => {
        this.joined = true;
        this.msgService.show('¡Te has apuntado al evento!🎉', 'success');
      },
      error: (err) => {
        console.error(err);
        if (err.error && typeof err.error === 'string' && err.error.includes('ya está apuntado')) {
          this.joined = true;
        this.msgService.show('¡Ya estabas apuntado!🎉', 'success');
        } else {
        this.msgService.show('¡Error al apuntarse. Vuelve a intentarlo!', 'danger');
          // alert('Error al intentar apuntarse. Inténtalo más tarde.');
        }
      }
    });
  }

  onLeave() {
    if(!confirm('¿Seguro que quieres desapuntarte?')) return;

    this.participantService.leaveEvent(this.event.id).subscribe({
      next: () => {
        this.joined = false;
        // alert('Te has desapuntado del evento');
        this.msgService.show('Te has desapuntado correctamente', 'success');
      },
      error: (err) => {
        this.msgService.show('Error al desapuntarte', 'danger');
      }
    });
  }

}