import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userService = inject(UserService);

  user?: User;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        console.log('Datos cargados:', data);
        this.user = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.isLoading = false;
      }
    });
  }

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
