import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-range',
  templateUrl: './progress-range.page.html',
  styleUrls: ['./progress-range.page.scss'],
})
export class ProgressRangePage {
  porcentaje = 0.5;

  constructor() {}

  rangeChange(event) {
    this.porcentaje = event.detail.value / 100;
  }
}
