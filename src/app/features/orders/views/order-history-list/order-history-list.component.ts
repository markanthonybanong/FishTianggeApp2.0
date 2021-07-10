import { Component, OnInit } from '@angular/core';
import { ImageService } from '@fish-tiangge/shared/services';
import { OrderHistoryListEndpoint } from '../../services/order-history-list/order-history-list-endpoint';
import { OrderHistoryListStore } from '../../services/order-history-list/order-history-list-store';

@Component({
  selector: 'app-order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.scss'],
  providers: [OrderHistoryListStore, OrderHistoryListEndpoint]
})
export class OrderHistoryListComponent implements OnInit {

  constructor(
    public store: OrderHistoryListStore,
    public imageService: ImageService
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.store.init();
  }

}
