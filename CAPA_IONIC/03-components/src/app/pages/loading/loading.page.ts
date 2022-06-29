import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage {
  loading: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController) {}

  showLoading() {
    this.presentLoading();
    setTimeout(() => this.loading.dismiss(), 2000);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    await this.loading.present();
  }
}
