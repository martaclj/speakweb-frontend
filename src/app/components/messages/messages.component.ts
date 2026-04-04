import { Component, inject } from '@angular/core';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  // tengo el servicio para escuchar los mensajes o alertas
  messagesService = inject(MessagesService);

  // variables para html - para pintar aviso
  text: string = '';
  type: string = '';

  ngOnInit(): void {
    // suscripción al Observable message
    // Cada vez que alguien llama a show(), aparece mensaje de aviso
    this.messagesService.message.subscribe(data => {
      this.text = data.text;
      this.type = data.type;
    });
  }

}
