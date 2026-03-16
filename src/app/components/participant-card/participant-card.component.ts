import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-participant-card',
  imports: [RouterLink],
  templateUrl: './participant-card.component.html',
  styleUrl: './participant-card.component.css'
})
export class ParticipantCardComponent {
  @Input() user: any;
  @Input() canRate: boolean =false; // si es el propio usuario
  @Input() label?: string; // organizador vs participantes
  @Output() rate = new EventEmitter<void>();
}
