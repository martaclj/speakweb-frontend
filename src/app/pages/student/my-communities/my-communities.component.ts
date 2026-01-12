import { Component, inject, OnInit } from '@angular/core';
import { GroupMember } from '../../../interfaces/group-member';
import { RouterLink } from "@angular/router";
import { GroupCardComponent } from '../../../components/group-card/group-card.component';
import { GroupMemberService } from '../../../services/group-member.service';

@Component({
  selector: 'app-my-communities',
  standalone: true,
  imports: [RouterLink, GroupCardComponent],
  templateUrl: './my-communities.component.html',
  styleUrl: './my-communities.component.css'
})
export class MyCommunitiesComponent {

  private groupMemberService = inject(GroupMemberService);
  
  // lista de mis grupos (comunidades)
  myGroups: GroupMember[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.groupMemberService.getMyGroups().subscribe({
      next: (data) => {
        // console.log("Mis comunidades cargadas:", data);
        this.myGroups = data;
        this.isLoading = false;
      },
      error: (err) => {
        // console.error("Error al cargar mis comunidades:", err);
        this.isLoading = false;
      }
    });
  }

    // función para las banderas de los idiomas
  getFlagEmoji(code: string): string {
    if (!code) return '🌏';

    const upperCode = code.toUpperCase();

    const flags: { [key: string]: string } = {
      'ES': '🇪🇸',
      'EN': '🇬🇧',
      'FR': '🇫🇷',
      'DE': '🇩🇪',
      'IT': '🇮🇹',
      'PT': '🇵🇹',
      'JA': '🇯🇵'
    }; // ampliar según se vayan necesitando

    return flags[upperCode] || '🌏';
  }

}
