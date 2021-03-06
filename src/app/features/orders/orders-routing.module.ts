import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryListComponent } from './views/order-history-list/order-history-list.component';
import { OrderListComponent } from './views/order-list/order-list.component';
import { OrderLocationComponent } from './views/order-location/order-location.component';
import { OrderComponent } from './views/order/order.component';
import { OrdersComponent } from './views/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: 'order-list',
        component: OrderListComponent
      },
      {
        path: 'order-history-list',
        component: OrderHistoryListComponent
      },
      {
        path: '',
        redirectTo: 'order-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'order/:routedFrom/:orderId/:orderName/:orderStatus/:orderSellerStatus/:storeId',
    component: OrderComponent
  },
  {
    path: 'order-location/:orderId/:orderName/:orderStatus/:orderSellerStatus/:storeId/:lat/:lng',
    component: OrderLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
