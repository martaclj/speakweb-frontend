import { Component, inject, Input } from '@angular/core';
// para el manejo de fechas
import { DatePipe, UpperCasePipe } from '@angular/common';
import { GroupEvent } from '../../interfaces/group-event';
import { EventParticipantService } from '../../services/event-participant.service';

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

  onRegister() {
    this.participantService.joinEvent(this.event.id).subscribe({
      next: () => {
        this.joined = true;
      },
      error: (err) => {
        console.error(err);
        if (err.error && typeof err.error === 'string' && err.error.includes('ya está apuntado')) {
          this.joined = true;
        } else {
          alert('Error al intentar apuntarse. Inténtalo más tarde.');
        }
      }
    });
  }
}
// // código sustituible por uso de datepipe
  // getDay(dateString: string): string {
  //   return new Date(dateString).getDate().toString();
  // }

  // getMonth(dateString: string): string {
  //   const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  //   const monthIndex = new Date(dateString).getMonth();
  //   return months[monthIndex];
  // }

  // getTime(dateString: string): string {
  //   return dateString.substring(11,16);
  //   // Ej fecha "2026-05-23T18:30:00"
  //   // se corta de la letra 11 a la 16
  // }