import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './views/product/product.component';
import { IonicModule } from '@ionic/angular';
import { ProductsComponent } from './views/products/products.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreListComponent } from './views/store-list/store-list.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductListComponent,
    StoreListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
