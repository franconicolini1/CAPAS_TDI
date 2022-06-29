import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/items.service';

interface Component2 {
  name: string;
  icon: string;
  redirectTo: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  items: Component2[];
  textoBuscar = '';

  constructor(private itemsService: ItemService) {}

  ngOnInit() {
    this.itemsService.getItems().subscribe((lista) => (this.items = lista));
  }

  onSearchChange(event: any) {
    this.textoBuscar = event.detail.value;
  }
}
