import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreditsResponse,
  MovieDetail,
  ResponseMDB,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private popularsPage = 0;

  constructor(private http: HttpClient) {}

  getPopulars() {
    this.popularsPage++;
    return this.executeQuery<ResponseMDB>(
      `/discover/movie?sort_by=popularity.desc&api_key=${environment.apiKey}&page=${this.popularsPage}`
    );
  }

  getMovies() {
    const today = new Date();
    const lastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    const month = today.getMonth() + 1;
    let monthString: number | string;

    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const begin = `${today.getFullYear()}-${monthString}-01`;
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.executeQuery<ResponseMDB>(
      `/discover/movie?primary_release_date.gte=${begin}&primary_release_date.lte=${end}`
    );
  }

  getMovieDetails(id: string) {
    return this.executeQuery<MovieDetail>(`/movie/${id}?a=1`);
  }

  getMovieActors(id: string) {
    return this.executeQuery<CreditsResponse>(`/movie/${id}/credits?a=1`);
  }

  searchMovies(text: string) {
    return this.executeQuery<ResponseMDB>(`/search/movie?query=${text}`);
  }

  private executeQuery<T>(query: string) {
    const request = `${environment.url}${query}&api_key=${environment.apiKey}&language=es-ES`;
    return this.http.get<T>(request);
  }
}
