import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLanguageService } from '../../services/user-language.service';
import { LanguageService } from '../../services/language.service';
import { User } from '../../interfaces/user';
import { UserLanguage } from '../../interfaces/user-language';
import { Language } from '../../interfaces/language';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userService = inject(UserService);
  userLanguageService = inject(UserLanguageService);
  languageService = inject(LanguageService);

  user?: User;
  myLanguages: UserLanguage[] = [];
  availableLanguages: Language[] = []; // xa select de idiomas disponibles
  isLoading: boolean = true;

  // variables añadir idiomas
  newLang = {
    languageId: 0,
    level: 'A1',
    type: 'LEARNER'
  };

  ngOnInit(): void {
    // Cargo datos usuario
    this.userService.getProfile().subscribe({
      next: (data) => {
        console.log('Datos cargados:', data);
        this.user = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
    // Cargo idiomas
    this.loadMyLanguages();
    // Cargo lista de idiomas - select
    this.languageService.getAllLanguages(). subscribe(data => {
      this.availableLanguages = data;
    })
  }
  loadMyLanguages() {
    this.userLanguageService.getMyLanguages().subscribe({
      next: (data) => this.myLanguages = data
    })
  }

  addLanguage() {
    if (this.newLang.languageId === 0) {
      alert("Selecciona un idioma");
      return;
    }

    this.userLanguageService.addLanguage(
      this.newLang.languageId,
      this.newLang.level,
      this.newLang.type).subscribe({
        next: (newItem) => {
          this.myLanguages.push(newItem);
          alert("Idioma añadido correctamente");
          this.newLang.languageId = 0; // reinicio de formulario
        },
        error: (err) => alert("Error al añadir idioma (¿ya lo tienes?)")
      });
  }

  // para actualización de datos
  onSubmit() {
    if (this.user) {
      this.userService.updateProfile(this.user).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          alert('¡Datos actualizados correctamente!');
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al guardar cambios');
        }
      });
    }
  }

}
