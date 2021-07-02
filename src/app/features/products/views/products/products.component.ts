import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProductsStore } from '../../services/products/products-store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsStore]
})
export class ProductsComponent {

  constructor(
    private menu: MenuController,
    public store: ProductsStore
  ) { }
  ionViewWillEnter() {
    this.store.init();
  }
  openMenu(): void {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }
}
