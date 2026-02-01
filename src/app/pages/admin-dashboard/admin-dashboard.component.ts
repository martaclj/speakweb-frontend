import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private msgService = inject(MessagesService);

  users: User[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadUsers();
  }

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

}
