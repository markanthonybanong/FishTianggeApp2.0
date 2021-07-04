import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { IonicModule } from '@ionic/angular';
import { CartComponent } from './views/cart/cart.component';
import { CheckOutComponent } from './views/check-out/check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartComponent,
    CheckOutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
