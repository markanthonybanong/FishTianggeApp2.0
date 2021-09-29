import { Component } from '@angular/core';
import { OrderDataService } from '@fish-tiangge/shared/data-service';
import { ImageService } from '@fish-tiangge/shared/services';
import { OrderListEndpoint } from '../../services/order-list/order-list-endpoint';
import { OrderListStore } from '../../services/order-list/order-list-store';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [OrderListStore, OrderListEndpoint]
})
export class OrderListComponent{

  constructor(
    public store: OrderListStore,
    private imageService: ImageService,
    public dataService: OrderDataService
  ) { }
  ionViewWillEnter(): void{
    this.store.init();
  }

}
