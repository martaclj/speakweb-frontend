import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { NewEvent } from '../../../interfaces/new-event';
import { MessagesService } from '../../../services/messages.service';
import { ImageService } from '../../../services/image.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-event',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  private eventService = inject(EventService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  // para los alerts
  private msgService = inject(MessagesService);
  private imageService = inject(ImageService);

  newEvent: NewEvent = {
    title: '',
    description: '',
    startTime: '',
    imageUrl: '',
    groupId: 0,
    type: 'PRESENTIAL', // valor por defecto
    location: '',
    externalLink: ''
  };

  // variable para archivo físico
  selectedFile?: File; 

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const groupId = Number(params.get('groupId'));
      if (groupId) {
        this.newEvent.groupId = groupId;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  // capturar el archivo cuando usuario lo selecciona
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // subir foto y crear evento
  onSubmit() {
    if (!this.newEvent.title || !this.newEvent.startTime) {
      this.msgService.show('Rellena el título y la fecha', 'danger');
      return;
    }
    // si hay foto seleccionada, se sube
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe({
        next: (response: any) => {
          // guardado de url relativa
          this.newEvent.imageUrl = `${environment.serverUrl}${response.imageUrl}`;
          // creación de evento
          this.createFinalEvent();
        },
        error: (err: any) => {
          console.error('Error al subir la imagen:', err);
          this.msgService.show('Error al subir imagen', 'danger');
        } 
      });
    } else {
      // si no hay foto, se crea el evento directamente
      this.createFinalEvent();
    }
  }
  createFinalEvent() {
    this.eventService.createEvent(this.newEvent).subscribe({
      next: () => {
        this.msgService.show('Evento creado', 'success');
        this.router.navigate(['/group', this.newEvent.groupId]);
      },
      error: (err) => {
        console.error('Error al crear:', err);
        this.msgService.show('Error. Comprueba si eres Experto o Admin.', 'danger');
      }
    });
  }

}