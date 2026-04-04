import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // inyección de Router
  const router = inject(Router);
  
  // token en localstorage?
  // el token se guarda al hacer login
  const token = localStorage.getItem('speakweb_token');

  if (token) {
  // si hay token - deja pasar a la ruta
    return true; // hay token en almacenamiento --> le dejo pasar

  } else {
    router.navigateByUrl('/login'); // no hay token, vuelta al login

    return false; // NO hay token

  }
};
