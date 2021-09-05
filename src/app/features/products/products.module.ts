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
import { CategoriesComponent } from './views/categories/categories.component';
import { CategoryListComponent } from './views/category-list/category-list.component';
import { CategoryComponent } from './views/category/category.component';
import { ModalStoreInformationComponent } from './modals/store/modal-store-information/modal-store-information.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductListComponent,
    StoreListComponent,
    StoreComponent,
    RatingListComponent,
    RatingComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryComponent,
    ModalStoreInformationComponent
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
