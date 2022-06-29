import { Component, OnInit } from '@angular/core';
import { Movies, ResponseMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  movies: Movies[] = [];
  posters: Movies[] = [];
  populars: Movies[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService
      .getMovies()
      .subscribe((data: ResponseMDB) => (this.movies = data.results));

    this.moviesService
      .getMovies()
      .subscribe((data: ResponseMDB) => (this.posters = data.results));

    this.getPopulars();
  }

  getPopulars() {
    this.moviesService.getPopulars().subscribe((data: ResponseMDB) => {
      const aux = [...this.populars, ...data.results];
      this.populars = aux;
    });
  }

  loadMore() {
    this.getPopulars();
  }
}
