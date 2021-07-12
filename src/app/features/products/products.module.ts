import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './views/product/product.component';
import { IonicModule } from '@ionic/angular';
import { ProductsComponent } from './views/products/products.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingListComponent } from './views/rating-list/rating-list.component';
import { StoreListComponent } from '../stores/views/store-list/store-list.component';
import { StoreComponent } from './views/store/store.component';
import { StarRatingModule } from 'ionic5-star-rating';
import { RatingComponent } from './views/rating/rating.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductListComponent,
    StoreListComponent,
    StoreComponent,
    RatingListComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule
  ]
})
export class ProductsModule { }
