import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLanguageService } from '../../services/user-language.service';
import { UserLanguage } from '../../interfaces/user-language';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-public-profile',
  imports: [RouterLink],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private userLanguageService = inject(UserLanguageService);

  user?: User;
  userLanguages: UserLanguage[] = [];
  isLoading: boolean = true;
  userId: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // + para convertir sring a nº
      if (this.userId) {
        this.loadData();
      }
    })
  }
  loadData() {
    this.isLoading = true;
    // carga datos del usuario concreto
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.loadLanguages();
      },
      error: (err) => {
        console.error('Error cargando usuario', err);
      }
    });
  }

  loadLanguages() {
    this.userLanguageService.getUserLanguages(this.userId).subscribe({
      next: (data) => {
        console.log('IDIOMAS RECIBIDOS:', data);
        this.userLanguages = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando idiomas', err);
        this.isLoading = false;
      }
    });
  }
}
