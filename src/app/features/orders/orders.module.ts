import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderHistoryListComponent } from './views/order-history-list/order-history-list.component';
import { OrderListComponent } from './views/order-list/order-list.component';
import { OrdersComponent } from './views/orders/orders.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    OrderHistoryListComponent,
    OrderListComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
