import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';
import { MessagesService } from '../../services/messages.service';
import { Language } from '../../interfaces/language';
import { Group } from '../../interfaces/group';
import { LanguageService } from '../../services/language.service';
import { GroupService } from '../../services/group.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe, RouterLink, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  private userService = inject(UserService);
  private languageService = inject(LanguageService);
  private groupService = inject(GroupService);
  private router = inject(Router);
  private msgService = inject(MessagesService);

  // pestañas
  activeTab: 'users' | 'languages' | 'groups' = 'users';
  isLoading: boolean = true;

  // listas de datos
  users: User[] = [];
  languages: Language[] = [];
  groups: Group[] = [];

  // form nuevo idioma
  newLangCode: string = '';
  newLangName: string = '';

  ngOnInit(): void {
    this.loadAllData();
  }
  loadAllData() {
    this.isLoading = true;
    this.loadUsers();
    this.loadLanguages();
    this.loadGroups();
  }

  switchTab(tab: 'users' | 'languages' | 'groups') {
    this.activeTab = tab;
  }

  // gestión de usuarios
  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        // alert('Error! No tienes permiso entrar aquí.')
        this.msgService.show('Error! No tienes permiso entrar aquí.', 'danger');
        this.router.navigate(['/home']);
      }
    });
  }

  deleteUser(user: User) {
    const confirmDelete = confirm(`¿Borrar al usuario?`);

    if (confirmDelete) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          // alert('Usuario eliminado!');
        this.msgService.show('¡Usuario eliminado!', 'success');
          this.loadUsers();
        },
        error: (err) => {
          // alert('No se pudo eliminar. Tiene eventos asociados!');
        this.msgService.show('No se puede eliminar. Tiene eventos asociados', 'danger');
        }
      });
    }
  }

  // gestión de idiomas
  loadLanguages() {
    this.languageService.getAllLanguages().subscribe({
      next: (data) => this.languages = data,
      error: (err) => console.error('Error cargando idiomas', err)
    });
  }

  addLanguage() {
    if (!this.newLangCode || !this.newLangName) {
      this.msgService.show('Rellena el código y el nombre del idioma', 'danger');
      return;
    }
    // creación del objeto
    const newLang: any = { 
      code: this.newLangCode,
      name: this.newLangName
    };

    this.languageService.save(newLang).subscribe({
      next: () => {
      this.msgService.show('Idioma añadido al sistema', 'success');
      this.newLangCode = '',
      this.newLangName = '';
      this.loadLanguages();
    },
    error: () => this.msgService.show('Error al añadir', 'danger')
    });
  }
  

  deleteLanguage(id: number) {
    if (confirm('Seguro que quieres eliminar este idioma del sistema?')) {
      this.languageService.deleteLanguage(id).subscribe({
        next: () => {
          this.msgService.show('Idioma eliminado', 'success');
          this.loadLanguages();
        },
        error: () => this.msgService.show('No se puede borrar.')
      });
    }
  }

  // gestión de grupos
  loadGroups() {
    this.groupService.getAllGroups().subscribe({
      next: (data) => this.groups = data,
      error: (err) => console.error('Error cargando grupos', err)
    });
  }
}
