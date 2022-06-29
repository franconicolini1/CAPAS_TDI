import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slides-show-posters',
  templateUrl: './slides-show-posters.component.html',
  styleUrls: ['./slides-show-posters.component.scss'],
})
export class SlidesShowPostersComponent implements OnInit {
  @Input() posters: any[] = [];

  slideOpts = {
    slidesPerView: 2.2,
    freeMode: true, // Para que pueda deslizar libremente sin freno
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async showModal(movieId: string) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        movieId,
      },
    });

    modal.present();
  }
}
