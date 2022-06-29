import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.page.html',
  styleUrls: ['./refresh.page.scss'],
})
export class RefreshPage implements OnInit {
  items = Array(0);

  constructor() {}

  ngOnInit() {}

  doRefresh(e) {
    setTimeout(() => {
      this.items = Array(15);
      e.target.complete();
    }, 1300);
  }
}
