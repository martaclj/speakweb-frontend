import { Component, Input } from '@angular/core';
import { GroupEvent } from '../../interfaces/group-event';

@Component({
  selector: 'app-event-card',
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  @Input({ required: true }) event!: GroupEvent;


  getDay(dateString: string): string {
    return new Date(dateString).getDate().toString();
  }

  getMonth(dateString: string): string {
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const monthIndex = new Date(dateString).getMonth();
    return months[monthIndex];
  }

  getTime(dateString: string): string {
    return dateString.substring(11,16);
    // Ej fecha "2026-05-23T18:30:00"
    // se corta de la letra 11 a la 16
  }

  onRegister() {
    alert('Funcionalidad de apuntarse próximamente...');
  }
}
