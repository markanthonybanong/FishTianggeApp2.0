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
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
