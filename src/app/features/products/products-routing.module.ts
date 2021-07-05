import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductComponent } from './views/product/product.component';
import { ProductsComponent } from './views/products/products.component';
import { StoreListComponent } from './views/store-list/store-list.component';

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
    path: 'store-list/products/product/:actionType/:productId/:productName/:storeId/:storeName',
    component: ProductComponent
  },
  {
    path: 'store-list/products/:storeId/:storeName',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
