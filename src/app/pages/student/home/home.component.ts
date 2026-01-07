import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../interfaces/group';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // inyección de dependencias:
  private groupService = inject(GroupService);

  groupList: Group[] = [] // recibo datos del backend
  filteredList: Group[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.getGroups();
  }

  // muestra todos los grupos disponibles
  getGroups() {
    this.groupService.getAllGroups().subscribe({
      next: (data: any) => {
        console.log("Datos recibidos:", data);
        this.groupList = data; 
        this.filteredList = data;
      },
      error: (error) => {
        console.error("Error al obtener grupos:", error);
      }
    })
  }

  searchGroups() {
    if (!this.searchTerm) {
      this.filteredList = this.groupList;
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredList = this.groupList.filter(group => 
      group.name.toLowerCase().includes(term) ||
      group.language1.name.toLowerCase().includes(term) ||
      group.language2.name.toLowerCase().includes(term)
    );
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
