import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);
  private tokenKey = 'speakweb_token';

    constructor() { }

    // estoy logueado?
  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null; // hay token??
  }

// cerrar sesión:
  logOut() {
    localStorage.removeItem('speakweb_token'); // borro el token para cerrar sesión

    this.router.navigateByUrl('/login'); // redirige a login
  }

}
