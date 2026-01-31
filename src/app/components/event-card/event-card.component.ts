import { Component, inject, Input } from '@angular/core';
// para el manejo de fechas
import { DatePipe, UpperCasePipe } from '@angular/common';
import { GroupEvent } from '../../interfaces/group-event';
import { EventParticipantService } from '../../services/event-participant.service';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  @Input({ required: true }) event!: GroupEvent;
  @Input() joined: boolean = false;

  private participantService = inject(EventParticipantService);
  private msgService = inject(MessagesService);

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
        alert('Te has desapuntado del evento');
      },
      error: (err) => alert('Error al desapuntarte')
    });
  }

}