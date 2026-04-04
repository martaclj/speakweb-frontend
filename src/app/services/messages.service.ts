// service para mostrar alertas en la interfaz
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  /* cualquier componente puede usar
  msgService.show("texto", "success") o "danger"
  */
  // para guardar los mensajes de alert y que queden más discretos
  // BehaviourSubject guarda el último valor emitido en memoria. --> componente recibe mensaje actual al suscribirse
  private messageSource = new BehaviorSubject<{text: string, type: string}>({ 
    text: '', 
    type: '' 
  });
  // Behaviour se usa para persistir el último mensaje al suscribirse.

  // Observable al que se suscribe el componente de mensajes
  public message: Observable<{text: string, type: string}> = 
  this.messageSource.asObservable();

  constructor() { }

  // Enviar un aviso (success o danger)
  // emite el mensaje y lo borra a los 3 segundos
  show(text: string, type: 'success' | 'danger' = 'success') {
    // emite el dato para los q se suscriban
    this.messageSource.next({ text: text, type: type });

    setTimeout(() => {
      this.messageSource.next({ text: '', type: '' }); // lo limpia
    }, 3000); // desaparece a los 3 segundos (el aviso)
  }
}
