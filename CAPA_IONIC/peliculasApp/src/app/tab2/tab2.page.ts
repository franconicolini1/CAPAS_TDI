import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../components/details/details.component';
import { Movies } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  searchText = '';
  searching = false;
  movies: Movies[] = [];
  ideas = [
    'Batman',
    'Superman',
    'Aquaman',
    'Flash',
    'Green Lantern',
    'Iron',
    'Supergirl',
    'Wonder',
    'Martian Manhunter',
    'Robin',
    'Green Arrow',
  ];

  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController
  ) {}

  onSearchChange(event: any) {
    const text = event.detail.value;
    this.searching = text.length > 0;
    if (text === '') {
      this.movies = [];
      return;
    }
    this.moviesService.searchMovies(event.detail.value).subscribe((data) => {
      this.movies = data.results;
      this.searching = false;
    });
  }

  async showDetails(movieId: number) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        movieId,
      },
    });
    modal.present();
  }

  selectIdea(idea: string) {
    this.searchText = idea;
  }
}
