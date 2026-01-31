import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // para guardar los mensajes de alert y que queden más discretos
  // BehaviourSubject guarda el último valor emitido en memoria. --> componente recibe mensaje actual al suscribirse
  private messageSource = new BehaviorSubject<{text: string, type: string}>({ text: '', type: '' });

  public message: Observable<{text: string, type: string}> = this.messageSource.asObservable();

  constructor() { }

  show(text: string, type: 'success' | 'danger' = 'success') {
    // emite el dato para los q se suscriban
    this.messageSource.next({ text: text, type: type });

    setTimeout(() => {
      this.messageSource.next({ text: '', type: '' });
    }, 3000); // desaparece a los 3 segundos
  }
}
