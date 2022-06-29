import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
})
export class ButtonPage {
  favorite = false;

  onClick() {
    this.favorite = !this.favorite;
  }
}
