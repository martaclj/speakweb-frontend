import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  private userService = inject(UserService);
  private router = inject(Router);

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
        alert('Error! No tienes permiso entrar aquí.')
        this.router.navigate(['/home']);
      }
    });
  }

  deleteUser(user: User) {
    const confirmDelete = confirm(`¿Borrar al usuario?`);

    if (confirmDelete) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          alert('Usuario eliminado!');
          this.loadUsers();
        },
        error: (err) => {
          alert('No se pudo eliminar. Tiene eventos asociados!');
        }
      });
    }
  }

}
