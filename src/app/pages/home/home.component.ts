import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // inyección de dependencias:
  private groupService = inject(GroupService);
  router = inject(Router);

  groupList: any[] = [] // recibo datos del backend

  ngOnInit(): void {
    this.getGroups();
  }

  // muestra todos los grupos disponibles
  getGroups() {
    this.groupService.getAllGroups().subscribe({
      next: (data: any) => {
        console.log("Datos recibidos:", data);
        this.groupList = data; 
      },
      error: (error) => {
        console.error("Error al obtener grupos:", error);
      }
    })
  }

  // unirse a un grupo
  joinGroup(id: number) {
    this.groupService.joinGroup(id).subscribe({
      next: (data) => {
        console.log("Te has unido al grupo:", data);
        alert("Bien! Te has unido correctamente!");
      },
      error: (error) => {
        console.error("Error al unirse:", error);
        alert("Ya estás en ese grupo");
      }
    });
  }

  // cerrar sesión:
  logOut() {
    localStorage.removeItem('speakweb_token'); // borro el token para cerrar sesión

    this.router.navigateByUrl('/login'); // redirige a login
  }

}
