import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../interfaces/group';
import { FormsModule } from '@angular/forms';
import { GroupCardComponent } from '../../../components/group-card/group-card.component';
import { GroupMemberService } from '../../../services/group-member.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, GroupCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // inyección de dependencias:
  private groupService = inject(GroupService);
  private groupMemberService = inject(GroupMemberService);

  private msgService = inject(MessagesService);

  groupList: Group[] = [] // recibo datos del backend
  filteredList: Group[] = [];
  searchTerm: string = '';
  myGroupIds: number[] = []; // guardo ids de grupos dnd ya estoy

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
      },
      error: (error) => {
        console.error("Error al obtener grupos:", error);
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

    if (this.isMember(id)) {
      // alert('Ya eres miembro de este grupo!');
      this.msgService.show('Ya eres miembro de este grupo!', 'success');
      return;
    }

    this.groupService.joinGroup(id).subscribe({
      next: (data) => {
        console.log("Te has unido al grupo:", data);
        // alert("Bien! Te has unido correctamente!");
      this.msgService.show('Bien! Te has unido correctamente!', 'success');
      // actualizar la lista para que el botón cambie 
      this.myGroupIds.push(id);

      },
      error: (error) => {
        console.error("Error al unirse:", error);
        // alert("Ya estás en ese grupo");
      this.msgService.show('Ya formas parte del grupo!', 'danger');

      }
    });
  }

}
