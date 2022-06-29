import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ItemService } from '../../services/items.service';

interface Component2 {
  name: string;
  icon: string;
  redirectTo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  components: Observable<Component2[]>;

  constructor(
    private menuController: MenuController,
    private itemsService: ItemService
  ) {}

  ngOnInit() {
    this.components = this.itemsService.getItems();
  }

  showMenu() {
    this.menuController.toggle('first');
  }
}
