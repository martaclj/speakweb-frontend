import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from '../../../services/rating.service';
import { UserService } from '../../../services/user.service';
import { Location } from '@angular/common';
import { MessagesService } from '../../../services/messages.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-rate-user',
  imports: [FormsModule],
  templateUrl: './rate-user.component.html',
  styleUrl: './rate-user.component.css'
})

export class RateUserComponent {
  private route = inject(ActivatedRoute);
  private ratingService = inject(RatingService);
  private userService = inject(UserService);
  private location = inject(Location);
  private msgService = inject(MessagesService);

  ratedUser?: User;
  userId: number = 0;
  eventId: number = 0;
  score: number = 0;
  comment: string = '';
  isLoading: boolean = true;

  stars = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
      this.eventId = Number(params.get('eventId'));
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe({
          next: (user) => {
            this.ratedUser = user;
            this.isLoading = false;
          },
          error: () => {
            this.msgService.show('No se puede cargar el usuario', 'danger');
            this.isLoading = false;
          }
        });
      }
    });
  }

  setScore(n: number) {
    this.score = n;
  }

  onSubmit() {
    if (this.score < 1 || this.score > 5) {
      this.msgService.show('Selecciona una puntuación del 1 al 5', 'danger');
      return;
    }

    const ratingData = {
      reviewedUserId: this.userId,
      eventId: this.eventId,
      score: this.score,
      comments: this.comment,
    };

    this.ratingService.createRating(ratingData).subscribe({
      next: () => {
        this.msgService.show('¡Valoración enviada', 'success');
        this.location.back();
      },
      error: (err) => {
        this.msgService.show(err.error || 'Error al valorar', 'danger');
      }
    });
  }
goBack() {
  this.location.back();
}

}
