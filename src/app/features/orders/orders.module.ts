import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderHistoryListComponent } from './views/order-history-list/order-history-list.component';
import { OrderListComponent } from './views/order-list/order-list.component';
import { OrdersComponent } from './views/orders/orders.component';
import { IonicModule } from '@ionic/angular';
import { OrderComponent } from './views/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'ionic5-star-rating';
import { ModalRatingComponent } from './modals/order/modal-rating/modal-rating.component';

@NgModule({
  declarations: [
    OrderHistoryListComponent,
    OrderListComponent,
    OrdersComponent,
    OrderComponent,
    ModalRatingComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StarRatingModule
  ],
  entryComponents: [ModalRatingComponent]
})
export class OrdersModule { }
