import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movies } from 'src/app/interfaces/interfaces';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slides-show-backdrop',
  templateUrl: './slides-show-backdrop.component.html',
  styleUrls: ['./slides-show-backdrop.component.scss'],
})
export class SlidesShowBackdropComponent implements OnInit {
  @Input() movies: Movies[] = [];

  slideOpts = {
    slidesPerView: 1.2,
    freeMode: true, // Para que pueda deslizar libremente sin freno
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async showModal(movieId: number) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        movieId,
      },
    });

    modal.present();
  }
}
