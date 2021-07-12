import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductComponent } from './views/product/product.component';
import { ProductsComponent } from './views/products/products.component';
import { StoreListComponent } from '../stores/views/store-list/store-list.component';
import { StoreComponent } from './views/store/store.component';
import { RatingListComponent } from './views/rating-list/rating-list.component';
import { RatingComponent } from './views/rating/rating.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'product-list',
        component: ProductListComponent
      },
      {
        path: 'add/:actionType',
        component: ProductComponent,
      },
      {
        path: 'store-list',
        component: StoreListComponent
      },
      {
        path: '',
        redirectTo: 'product-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'products-list/product/:actionType/:productId/:productName',
    component: ProductComponent,
  },
  {
    path: 'store-list/store/:storeId/:storeName',
    component: StoreComponent,
    children: [
      {
        path: 'product-list/:storeId/:storeName',
        component: ProductListComponent
      },
      {
        path: 'rating-list/:storeId/:storeName',
        component: RatingListComponent
      }
    ]
  },
  {
    path: 'store-list/products/product/:actionType/:productId/:productName/:storeId/:storeName',
    component: ProductComponent
  },
  {
    path: 'rating-list/rating/:ratingId/:storeId/:storeName',
    component: RatingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
