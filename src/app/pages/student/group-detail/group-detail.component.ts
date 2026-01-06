import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../interfaces/group';

@Component({
  selector: 'app-group-detail',
  imports: [],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private groupService = inject(GroupService);

  group?: Group;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (id) {
        this.loadGroup(id);
      }
    });
  }
  loadGroup(id: number) {
    this.groupService.getGroupById(id).subscribe({
      next: (data) => {
        console.log("Datos del grupo cargados:", data);
        this.group = data;
        this.isLoading = false;
      }
    });
  }

}
