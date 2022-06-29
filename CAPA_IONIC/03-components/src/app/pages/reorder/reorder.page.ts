import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.page.html',
  styleUrls: ['./reorder.page.scss'],
})
export class ReorderPage {
  doReorder(e) {
    e.detail.complete(); // PAra que se puedan seguir moviendo los demás elementos
  }
}
