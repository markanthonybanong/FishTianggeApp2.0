import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { OrdersStore } from '../../services/orders/orders-store';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersStore]
})
export class OrdersComponent implements OnInit {

  constructor(
    private menu: MenuController,
    public store: OrdersStore
  ) { }

  ngOnInit() {}

  openMenu(): void {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }

}
