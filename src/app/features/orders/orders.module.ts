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
import { ModalReportComponent } from './modals/order/modal-report/modal-report.component';
import { OrderLocationComponent } from './views/order-location/order-location.component';

@NgModule({
  declarations: [
    OrderHistoryListComponent,
    OrderListComponent,
    OrdersComponent,
    OrderComponent,
    ModalRatingComponent,
    ModalReportComponent,
    OrderLocationComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StarRatingModule
  ],
  entryComponents: [
  ]
})
export class OrdersModule { }
