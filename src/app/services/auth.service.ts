import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);
  private tokenKey = 'speakweb_token';
  // clave para el rol
  private roleKey = 'speakweb_role';

    constructor() { }

    // estoy logueado?
  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null; // hay token??
  }

  // es administrador
  isAdmin(): boolean {
    const role = localStorage.getItem(this.roleKey);
    return role === 'ADMIN'; // rol es ADMIN? --> true
  }

  // cerrar sesión:
  logOut() {
    localStorage.removeItem('speakweb_token'); // borro el token para cerrar sesión
    localStorage.removeItem(this.roleKey); // borro rol
    this.router.navigateByUrl('/login'); // redirige a login
  }

}
