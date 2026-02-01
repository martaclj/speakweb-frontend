import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // capturo datos del formulario
  registerObj: any = {
    "name": "",
    "surname": "",
    "email": "",
    "password": ""
  };

  http = inject(HttpClient);
  router = inject(Router);
  private msgService = inject(MessagesService);

  onRegister() {
    const url = 'http://localhost:8080/api/auth/register';

    this.http.post(url, this.registerObj).subscribe({
      next: (res: any) => {
        this.msgService.show('Registro correcto! ya puedes iniciar sesión', 'success');
        // alert("¡Registro correcto! Ya puedes iniciar sesión.");
        this.router.navigateByUrl('/login'); 
      },
      error: (err) => {
        console.error("Error en registro:", err);
        if (err.status === 409) {
          this.msgService.show('Ese email ya está registrado!', 'danger');
          // alert("Ese email ya está registrado.");
        } else {
          this.msgService.show('Error al registrarte', 'danger');
          // alert("Ha ocurrido un error al registrarte.");
        }
      }
    })
  }

}
