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
import { DeletedUser } from '../../interfaces/deleted-user';
import { DeletedUserService } from '../../services/deleted-user.service';
import { EventService } from '../../services/event.service';
import { GroupEvent } from '../../interfaces/group-event';
import { NewEvent } from '../../interfaces/new-event';

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
  private deletedUserService = inject(DeletedUserService)
  private eventService = inject(EventService);
  private msgService = inject(MessagesService);

  // pestañas
  activeTab: 'users' | 'languages' | 'groups' | 'events' | 'deleted-users' = 'users';
  isLoading: boolean = true;

  // listas de datos
  users: User[] = [];
  languages: Language[] = [];
  groups: Group[] = [];
  events: GroupEvent[] = [];
  deletedUsers: DeletedUser[] = [];

  // diccionario nota usuario
  userReputations: { [userId: number]: any } = {};

  // xa form nuevo idioma
  newLangCode: string = '';
  newLangName: string = '';

  // form nuevo grupo
  newGroupName: string = '';
  newGroupDescription: string = '';
  newGroupLanguage1Id: number = 0;
  newGroupLanguage2Id: number = 0;

  // formulario new event
  newEventTitle: string = '';
  newEventDescription: string = '';
  newEventGroupId: number = 0;
  newEventType: 'ONLINE' | 'PRESENTIAL' = 'PRESENTIAL';
  newEventStartTime: string = '';
  newEventLocation: string = '';
  newEventExternalLink: string = '';


  ngOnInit(): void {
    this.loadAllData();
  }
  loadAllData() {
    this.isLoading = true;
    this.loadUsers();
    this.loadLanguages();
    this.loadGroups();
    this.loadEvents();
    this.loadDeletedUsers();
  }

  loadDeletedUsers() {
    this.deletedUserService.getAllDeletedUsers().subscribe({
      next: (data) => this.deletedUsers = data,
      error: (err) => console.error('Error al cargar usuarios borrados', err)
    });
  }

  switchTab(tab: 'users' | 'languages' | 'groups' | 'events' | 'deleted-users') {
    this.activeTab = tab;
  }

  // gestión de usuarios
  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.users.forEach(user => {
          // valor provisional - mientras carga
          this.userReputations[user.id] = { score: '5.0', count: 0 };

          this.userService.getUserReputation(user.id).subscribe({
            next: (rep) => {
              this.userReputations[user.id] = rep;
            },
            error: (err) => console.error(`Error cargando reputación de ${user.id}`, err)
          });
        });

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
        this.msgService.show('No se puede eliminar.', 'danger');
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

  createGroup() {
    if (!this.newGroupName) {
      this.msgService.show('El nombre es obligatorio', 'danger');
      return;
    }

    const newGroup = {
      name: this.newGroupName,
      description: this.newGroupDescription,
      language1Id: this.newGroupLanguage1Id,
      language2Id: this.newGroupLanguage2Id
    };

    this.groupService.createGroup(newGroup).subscribe({
      next: () => {
        this.msgService.show('Comunidad creada', 'success');
        this.newGroupName = '';
        this.newGroupDescription = '';
        this.newGroupLanguage1Id = 0;
        this.newGroupLanguage2Id = 0;
        this.loadGroups();
      }
    });
  }

  deleteGroup(id: number) {
    if (confirm('¿Seguro que quieres eliminar este grupo?')) {
      this.groupService.deleteGroup(id).subscribe({
        next: () => {
          this.msgService.show('Grupo eliminado', 'success');
          this.loadGroups();
        },
        error: () => this.msgService.show('No se puede eliminar', 'danger')
      });
    }
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Error cargando events', err)
    });
  }

  createEvent() {
    if (!this.newEventTitle || !this.newEventStartTime) {
      this.msgService.show('Título y fecha obligatorios', 'danger');
      return;
    }

    const newEvent: NewEvent = {
      title: this.newEventTitle,
      description: this.newEventDescription,
      groupId: this.newEventGroupId,
      type: this.newEventType,
      startTime: this.newEventStartTime,
      location: this.newEventType === 'PRESENTIAL' ? this.newEventLocation : undefined,
      externalLink: this.newEventType === 'ONLINE' ? this.newEventExternalLink : undefined
    };

    this.eventService.createEvent(newEvent).subscribe({
      next: () => {
        this.msgService.show('Evento creada', 'success');
        this.newEventTitle = '';
        this.newEventDescription = '';
        this.newEventGroupId = 0;
        this.newEventType = 'PRESENTIAL';
        this.newEventStartTime = '';
        this.newEventLocation = '';
        this.newEventExternalLink = '';
        this.loadEvents();
      },
      error: () => this.msgService.show('Error al crear evento', 'danger')
    });
  }

  deleteEvent(id: number) {
    if (confirm('¿Seguro que quieres eliminar este evento?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.msgService.show('Evento eliminado', 'success');
          this.loadEvents();
        },
        error: () => this.msgService.show('No se puede eliminar', 'danger')
      });
    }
  }

}
