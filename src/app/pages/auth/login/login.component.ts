import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessagesService } from '../../../services/messages.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = { // guardo lo que escriba el usuario
    "email": "",
    "password": ""
  };

  http = inject(HttpClient);
  router = inject(Router);
  private msgService = inject(MessagesService);

  onLogin() {

    const url = `${environment.apiUrl}/auth/login`;

    // hago la llamada post - me suscribo a la respuesta
    this.http.post(url, this.loginObj).subscribe({
      next: (res: any) => {

        console.log("Respuesta del servidor:", res);
        if(res.token) { // si el servidor me devuelve mi token ok
        // alert("Login Correcto!");
        this.msgService.show('¡Login correcto!', 'success');

        // guardo token en memoria del navegador
        localStorage.setItem('speakweb_token', res.token);

        // guarda el rol para saber si ADMIN o USER. Si admin- verá botón-dashboard
        localStorage.setItem('speakweb_role', res.role);

        // me redirige a la home
        this.router.navigateByUrl('home');
      } else {
        this.msgService.show('Error! No ha llegado el token', 'danger');
      }
    },
      error: (err) => {
        this.msgService.show('Usuario o contraseña incorrectos!', 'danger');
        console.error(err);
      }
    })
  }

}
