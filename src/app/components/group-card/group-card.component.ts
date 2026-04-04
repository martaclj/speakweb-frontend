import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Group } from '../../interfaces/group';
import { getFlagEmoji } from '../../utils/language-aliases';

@Component({
  selector: 'app-group-card',
  imports: [RouterLink],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.css'
})
export class GroupCardComponent {
  // ! non-null assertion operator - para poner vble sin inicializar
  // Grupo que se muestra en la tarjeta
  @Input({ required: true }) group!: Group;
  
  /* para reutilizar componente en home y my-communities
  por defecto 'true' */
  // por defecto en home sí se muestra botón Unirme
  @Input() showJoinButton: boolean = true;
  
  // si experto, aparece icono de experto
  @Input() isExpert: boolean = false;

  // para unirse desde la home - avisa a Home de que botón Unirme pulsado
  @Output() joinClick = new EventEmitter<number>();

  onJoin() {
    this.joinClick.emit(this.group.id);
  }

  // función para obtener bandera según el código
  getFlag(code: string): string {
    return getFlagEmoji(code);
  }

}
