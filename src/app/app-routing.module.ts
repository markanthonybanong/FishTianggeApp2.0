import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./features/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./features/stores/stores.module').then(m => m.StoresModule)
  },
  {
    path: 'archive',
    loadChildren: () => import('./features/archive/archive.module').then(m => m.ArchiveModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./features/my-account/my-account.module').then(m => m.MyAccountModule)
  },
  {
    path: 'deliveries',
    loadChildren: () => import('./features/deliveries/deliveries.module').then( m => m.DeliveriesModule)
  },
  {
    path: 'suki-list',
    loadChildren: () => import('./features/suki-list/suki-list.module').then( m => m.SukiListModule)
  },
  {
    path: 'store-rating',
    loadChildren: () => import('./features/store-rating/store-rating.module').then( m => m.StoreRatingModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
