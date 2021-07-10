import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DeliveriesStore } from '../../services/deliveries/deliveries-store';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss'],
  providers: [DeliveriesStore]
})
export class DeliveriesComponent implements OnInit {

  constructor(
    private menu: MenuController,
    public store: DeliveriesStore
  ) { }

  ngOnInit() {}
  openMenu(): void {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }

}
