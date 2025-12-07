import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  http = inject(HttpClient);

  groupList: any[] = [] // recibo datos del backend

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.http.get('http://localhost:8080/api/groups').subscribe({
      next: (data: any) => {
        console.log("Datos recibidos:", data);
        this.groupList = data;
      },
      error: (error) => {
        console.error("Error al obtener grupos:", error);
        alert("No se pueden cargar los datos. Comprobar token");
      }
    })
  }

}
