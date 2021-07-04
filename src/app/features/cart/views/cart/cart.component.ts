import { Component, OnInit } from '@angular/core';
import { ImageService } from '@fish-tiangge/shared/services';
import { MenuController } from '@ionic/angular';
import { CartEndpoint } from '../../services/cart/cart-endpoint';
import { CartStore } from '../../services/cart/cart-store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartStore, CartEndpoint]
})
export class CartComponent {

  constructor(
    private menu: MenuController,
    public store: CartStore,
    public imageService: ImageService
  ) { }

  ionViewWillEnter(): void{
    this.store.init();
  }
  openMenu(): void {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }

}
