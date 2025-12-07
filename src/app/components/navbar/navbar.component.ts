import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogOut() {
    this.authService.logOut();
  }
// para no mostrar cerrar sesión en la página de login
  isNotLoginPage(): boolean {
    return this.router.url !== '/login';
  }

}
