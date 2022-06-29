import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slides-show-par',
  templateUrl: './slides-show-par.component.html',
  styleUrls: ['./slides-show-par.component.scss'],
})
export class SlidesShowParComponent implements OnInit {
  @Input() posters: any[] = [];
  @Output() loadMore = new EventEmitter();

  slideOpts = {
    slidesPerView: 2.2,
    freeMode: true, // Para que pueda deslizar libremente sin freno
    spaceBetween: -10, // Espacio entre los slides
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onClick() {
    this.loadMore.emit();
  }

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
