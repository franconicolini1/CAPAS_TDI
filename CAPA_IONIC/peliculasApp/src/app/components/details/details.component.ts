import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetail, Cast } from '../../interfaces/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() movieId: string;
  movie: MovieDetail = {};
  actors: Cast[] = [];
  msgLen = 150;

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5,
  };

  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.moviesService
      .getMovieDetails(this.movieId)
      .subscribe((data) => (this.movie = data));

    this.moviesService
      .getMovieActors(this.movieId)
      .subscribe((data) => (this.actors = data.cast));
  }

  goBack() {
    this.modalController.dismiss();
  }

  markAsFavorite() {
    console.log('Mark as favorite');
  }
}
