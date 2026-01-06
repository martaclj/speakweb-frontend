import { Component, inject, OnInit } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { GroupMember } from '../../../interfaces/group-member';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-my-communities',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-communities.component.html',
  styleUrl: './my-communities.component.css'
})
export class MyCommunitiesComponent implements OnInit {

  private groupService = inject(GroupService);
  
  // lista de mis grupos (comunidades)
  myMemberships: GroupMember[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.groupService.getMyGroups().subscribe({
      next: (data) => {
        console.log("Mis comunidades cargadas:", data);
        this.myMemberships = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar mis comunidades:", err);
        this.isLoading = false;
      }
    });
  }


}
