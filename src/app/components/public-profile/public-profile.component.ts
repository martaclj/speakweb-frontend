import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLanguageService } from '../../services/user-language.service';
import { UserLanguage } from '../../interfaces/user-language';
import { User } from '../../interfaces/user';
import { DatePipe, Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-public-profile',
  imports: [RouterLink, DatePipe],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private userLanguageService = inject(UserLanguageService);
  private authService = inject(AuthService); // para que pueda ver ratings
  private location = inject(Location); // botón de volver
  private reportService = inject(ReportService);
  private msgService = inject(MessagesService);

  user?: User;
  userLanguages: UserLanguage[] = [];
  isLoading: boolean = true;
  userId: number = 0;

  // variables para el admin
  isAdmin: boolean = false;
  userRatings: any[] = [];
  userReports: any[] = [];

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    this.route.params.subscribe(params => {
      this.userId = +params['id']; // + para convertir sring a nº
      if (this.userId) {
        this.loadData();
      }
    })
  }
  loadData() {
    this.isLoading = true;
    // carga datos del usuario concreto
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.loadLanguages();

        // si el que ve el perfil es admin --> también ve valoraciones y denuncias
        if (this.isAdmin) {
          this.loadAdminData();
        }
      },
      error: (err) => {
        console.error('Error cargando usuario', err);
      }
    });
  }
  loadAdminData() {
    this.userService.getUserRatingsDetailed(this.userId).subscribe({
      next: (data) => {
        this.userRatings = data;
      },
      error: (err) => {
        console.error('Error al cargar las valoraciones:', err);
      }
    });
    
      this.userService.getUserReportsDetailed(this.userId).subscribe({
      next: (data) => {
        this.userReports = data;
      },
      error: (err) => {
        console.error('Error al cargar las denuncias:', err);
      }
    });
  }

  loadLanguages() {
    this.userLanguageService.getUserLanguages(this.userId).subscribe({
      next: (data) => {
        console.log('IDIOMAS RECIBIDOS:', data);
        this.userLanguages = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando idiomas', err);
        this.isLoading = false;
      }
    });
  }

  reportUser() {
    if (!this.user) return;

    const reason = prompt(`¿Por qué deseas denunciar a ${this.user.name}? Indica el motivo:`);
    if (!reason || reason.trim() === '') {
      return;
    }

    const reportData = {
      reportedUserId: this.userId,
      reason: reason.trim()
    };

    this.reportService.createReport(reportData).subscribe({
      next: () => {
        this.msgService.show('Denuncia enviada a moderación correctamente', 'success');
        if (this.isAdmin) {
          this.loadAdminData();
        }
      },
      error: (err) => {
        console.error(err);
        this.msgService.show(err.error || 'Error al enviar la denuncia', 'danger');
      }
    })

  }

  goBack() {
    this.location.back(); // devuelve a lugar de dónde vinieras
  }
}
