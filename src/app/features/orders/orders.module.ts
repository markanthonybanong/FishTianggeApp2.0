import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderHistoryListComponent } from './views/order-history-list/order-history-list.component';
import { OrderListComponent } from './views/order-list/order-list.component';
import { OrdersComponent } from './views/orders/orders.component';
import { IonicModule } from '@ionic/angular';
import { OrderComponent } from './views/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderHistoryListComponent,
    OrderListComponent,
    OrdersComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class OrdersModule { }
