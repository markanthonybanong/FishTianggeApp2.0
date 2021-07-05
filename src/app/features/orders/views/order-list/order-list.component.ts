import { Component, OnInit } from '@angular/core';
import { OrderListEndpoint } from '../../services/order-list/order-list-endpoint';
import { OrderListStore } from '../../services/order-list/order-list-store';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [OrderListStore, OrderListEndpoint]
})
export class OrderListComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  ionViewWillEnter(): void{
  }

}
