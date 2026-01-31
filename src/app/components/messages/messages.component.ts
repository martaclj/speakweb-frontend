import { Component, inject } from '@angular/core';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messagesService = inject(MessagesService);

  // variables para html
  text: string = '';
  type: string = '';

  ngOnInit(): void {
    // suscripción al Observable message
    this.messagesService.message.subscribe(data => {
      this.text = data.text;
      this.type = data.type;
    });
  }

}
