import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './views/cart/cart.component';
import { CheckOutComponent } from './views/check-out/check-out.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  },
  {
    path: 'check-out/:userId/:paymentType',
    component: CheckOutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
