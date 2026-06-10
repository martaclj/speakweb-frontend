import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../interfaces/group';
import { FormsModule } from '@angular/forms';
import { GroupCardComponent } from '../../../components/group-card/group-card.component';
import { GroupMemberService } from '../../../services/group-member.service';
import { MessagesService } from '../../../services/messages.service';

// ajustes paginación
// https://github.com/Anuar-UNIR/DWEC_2024_2025/blob/main/proyectos_clase/DC_Universe/DCUapp/package.json
import { NgxPaginationModule } from 'ngx-pagination';
import { LucideMessageSquareQuote, LucideSearch } from '@lucide/angular';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, GroupCardComponent, NgxPaginationModule, LucideMessageSquareQuote, LucideSearch],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // inyección de dependencias:
  private groupService = inject(GroupService);
  private groupMemberService = inject(GroupMemberService);
  private msgService = inject(MessagesService);

  // Lista del backend
  groupList: Group[] = [] // recibo datos del backend
  // lista filtrada
  filteredList: Group[] = [];
  // término buscado
  searchTerm: string = '';

  // para ocultar botón Unirme
  myGroupIds: number[] = []; // guardo ids de grupos dnd ya estoy
  
  // para que el spinner no cargue infinito
  isLoading: boolean = true;
  loadError: boolean = false;

  // ajustes paginación
  page: number = 1; // pág. actual

  ngOnInit(): void {
    this.getGroups();
    this.checkMyMemberships();
  }

  // muestra todos los grupos disponibles
  getGroups() {
    this.groupService.getAllGroups().subscribe({
      next: (data: any) => {
        console.log("Datos recibidos:", data);
        this.groupList = data; 
        this.filteredList = data;
        this.isLoading = false; // cuando recibe los datos, para spinner
      },
      error: (error) => {
        console.error("Error al obtener grupos:", error);
        // si se da error, paramos spinner
        this.isLoading = false;
        this.loadError = true;
      }
    })
  }

  checkMyMemberships() {
    this.groupMemberService.getMyGroups().subscribe ({
      next: (memberships) => {
        this.myGroupIds = memberships.map(m => m.group.id);
      },
      error: (err) => console.error(err)      
    });
  }

  // función para saber si ya soy miembro
  isMember(groupId: number): boolean {
    return this.myGroupIds.includes(groupId);
  }

  /* pasa a minúsculas y quita acentos: Francés - frances
  NFD separa letra de acento, replace borra acentos
  */
  private normalize(s: string): string {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  // buscador por nombre de grupo o por idioma 
  // - ver carpeta utils - language aliases
  searchGroups() {
    // pag. 1 - vuelve a pág. 1 tras búsqueda
    this.page = 1;

    if (!this.searchTerm) {
      this.filteredList = this.groupList;
      return;
    }
    
    const term = this.normalize(this.searchTerm);

    this.filteredList = this.groupList.filter(group =>
      this.normalize(group.name).includes(term) ||
      this.normalize(group.language1.name).includes(term) ||
      this.normalize(group.language2.name).includes(term)
    );
  }

  // unirse a un grupo
  joinGroup(id: number) {

    if (this.isMember(id)) {
      this.msgService.show('Ya eres miembro de este grupo!', 'success');
      return;
    }

    this.groupService.joinGroup(id).subscribe({
      next: (data) => {
        console.log("Te has unido al grupo:", data);
      this.msgService.show('Bien! Te has unido correctamente!', 'success');
      // actualizar la lista LOCALMENTE para que el botón cambie
      // es d. actualizo ids en memoria para cambiar el botón sin recargar 
      this.myGroupIds.push(id);
      },
      error: (error) => {
        console.error("Error al unirse:", error);
        this.msgService.show('Ya formas parte del grupo!', 'danger');
      }
    });
  }

}
