import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Group } from '../../interfaces/group';

@Component({
  selector: 'app-group-card',
  imports: [RouterLink],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.css'
})
export class GroupCardComponent {
  // ! non-null assertion operator - para poner vble sin inicializar
  @Input({ required: true }) group!: Group;
  /* para reutilizar componente en home y my-communities
  por defecto 'true' */
  @Input() showJoinButton: boolean = true;
  @Input() isExpert: boolean = false;

  // para unirse desde la home
  @Output() joinClick = new EventEmitter<number>();

  onJoin() {
    this.joinClick.emit(this.group.id);
  }

}
