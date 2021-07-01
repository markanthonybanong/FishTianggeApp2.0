import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './views/product/product.component';
import { IonicModule } from '@ionic/angular';
import { ProductsComponent } from './views/update-product/products/products.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { UpdateProductComponent } from './views/update-product/update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductListComponent,
    UpdateProductComponent
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
