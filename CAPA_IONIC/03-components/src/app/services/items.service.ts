import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Component2 {
  name: string;
  icon: string;
  redirectTo: string;
}

@Injectable()
export class ItemService {
  constructor(private client: HttpClient) {}

  getItems() {
    return this.client.get<Component2[]>('./assets/data/items.json');
  }
}
