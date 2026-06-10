import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideGem, LucideStar } from '@lucide/angular';
@Component({
  selector: 'app-participant-card',
  imports: [RouterLink, LucideGem, LucideStar],
  templateUrl: './participant-card.component.html',
  styleUrl: './participant-card.component.css'
})
export class ParticipantCardComponent {
  @Input() user: any;
  @Input() canRate: boolean =false; // si es el propio usuario
  @Input() label?: string; // organizador vs participantes
  @Output() rate = new EventEmitter<void>();
}
