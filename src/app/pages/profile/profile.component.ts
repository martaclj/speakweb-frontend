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
  // variables para guardar idiomas y usar en el select - q no se muestren los q ya tiene el user
  allSystemLanguages: Language[] = []; // todos los idiomas
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
    // Cargo todos los idiomas (allSystemLanguages)

    // Cargo lista de idiomas - select
    this.languageService.getAllLanguages(). subscribe(data => {
      this.allSystemLanguages = data;
      this.loadMyLanguages();
    });
  }
  loadMyLanguages() {
    this.userLanguageService.getMyLanguages().subscribe({
      next: (data) => {
        this.myLanguages = data
        // lista con los ids de mis idiomas actuales
        const myLanguagesIds: number[] = [];
        for (const item of this.myLanguages) {
          myLanguagesIds.push(item.language.id);
        }
        const filteredList: Language[] = []; // lista filtrada

        for (const systemLang of this.allSystemLanguages) {
          // si no está en mi lista de ids --> añado a disponible
          if (!myLanguagesIds.includes(systemLang.id))
          filteredList.push(systemLang);
        }
        this.availableLanguages = filteredList;
      },
      error: (err) => console.error(err)
    });
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
          this.loadMyLanguages(); // recargo lista para q se filtre el idioma ya añadido y no aparezca como opción
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

  deleteLanguage(id: number) {
    this.userLanguageService.deleteLanguage(id).subscribe({
      next: () => {
        alert("Idioma eliminado");
        this.loadMyLanguages(); // vuelvo a cargar mis idiomas una vez borrado 1
      },
      error: (err) => {
        console.error(err);
        alert("Error al eliminarlo.");
      }
    });
  }

}
