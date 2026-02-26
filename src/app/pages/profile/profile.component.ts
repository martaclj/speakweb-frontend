import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLanguageService } from '../../services/user-language.service';
import { LanguageService } from '../../services/language.service';
import { User } from '../../interfaces/user';
import { UserLanguage } from '../../interfaces/user-language';
import { Language } from '../../interfaces/language';
import { MessagesService } from '../../services/messages.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterLink, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userService = inject(UserService);
  userLanguageService = inject(UserLanguageService);
  languageService = inject(LanguageService);
  private msgService = inject(MessagesService);

  user?: User;
  myLanguages: UserLanguage[] = [];
  // variables para guardar idiomas y usar en el select - q no se muestren los q ya tiene el user
  allSystemLanguages: Language[] = []; // todos los idiomas
  availableLanguages: Language[] = []; // xa select de idiomas disponibles

  isLoading: boolean = true;

  // variables para guardas mis valoraciones (las del usuario propio)
  userRatings: any[] = []; // valoraciones
  userReports: any[] = []; // denuncias

  // variables añadir idiomas
  newLang = {
    languageId: 0,
    level: 'A1',
    type: 'LEARNER'
  };

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        console.log('Datos del otro usuario cargados:', data);
        this.user = data;
        this.isLoading = false;

        // cargo sus denuncias y valoraciones
        this.loadMyReviewData(data.id);
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

  loadMyReviewData(userId: any) {
    // lista de valoraciones
    this.userService.getUserRatingsDetailed(userId).subscribe({
      next: (data) => this.userRatings = data,
      error: (err) => console.error('Error cargando valoraciones', err)      
    });
    // lista de reportes
    this.userService.getUserReportsDetailed(userId).subscribe({
      next: (data) => this.userReports = data,
      error: (err) => console.error('Error cargando reportes', err)
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
      // alert("Selecciona un idioma");
      this.msgService.show('Selecciona un idioma', 'success');
      return;
    }

    this.userLanguageService.addLanguage(
      this.newLang.languageId,
      this.newLang.level,
      this.newLang.type).subscribe({
        next: (newItem) => {
          this.myLanguages.push(newItem);
          // alert("Idioma añadido correctamente");
          this.msgService.show('Idioma añadido', 'success');
          this.newLang.languageId = 0; // reinicio de formulario
          this.loadMyLanguages(); // recargo lista para q se filtre el idioma ya añadido y no aparezca como opción
        },
        error: (err) => {
          this.msgService.show('Error al añadir idioma (¿ya lo tienes?)', 'danger');
        }
        // alert("Error al añadir idioma (¿ya lo tienes?)")
      });
  }

  // para actualización de datos
  onSubmit() {
    if (this.user) {
      this.userService.updateProfile(this.user).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          // alert('¡Datos actualizados correctamente!');
          this.msgService.show('Datos actualizados', 'success');
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          this.msgService.show('Error al guardar', 'danger');
          // alert('Error al guardar cambios');
        }
      });
    }
  }

  deleteLanguage(id: number) {
    this.userLanguageService.deleteLanguage(id).subscribe({
      next: () => {
        // alert("Idioma eliminado");
        this.msgService.show('Idioma eliminado', 'success');
        this.loadMyLanguages(); // vuelvo a cargar mis idiomas una vez borrado 1
      },
      error: (err) => {
        console.error(err);
        this.msgService.show('Error al eliminar', 'danger');
        // alert("Error al eliminarlo.");
      }
    });
  }

}
