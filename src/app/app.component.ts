import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'speakweb-frontend';
  currentYear = new Date().getFullYear();

  private router = inject(Router);

  // // función para saber si login o registro y no enseñar footer
  // showFooter(): boolean {
  //   const currentUrl = this.router.url;
  //   if (currentUrl === '/login' || currentUrl === '/register') {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}
