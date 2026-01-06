import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  onRegister() {
    const url = 'http://localhost:8080/api/auth/register';

    this.http.post(url, this.registerObj).subscribe({
      next: (res: any) => {
        alert("¡Registro correcto! Ya puedes iniciar sesión.");
        this.router.navigateByUrl('/login'); 
      },
      error: (err) => {
        console.error("Error en registro:", err);
        if (err.status === 409) {
          alert("Ese email ya está registrado.");
        } else {
          alert("Ha ocurrido un error al registrarte.");
        }
      }
    })
  }

}
