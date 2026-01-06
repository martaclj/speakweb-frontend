import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../interfaces/group';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // inyección de dependencias:
  private groupService = inject(GroupService);

  groupList: Group[] = [] // recibo datos del backend

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

}
