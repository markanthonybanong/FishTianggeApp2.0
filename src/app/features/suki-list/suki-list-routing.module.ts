import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from '../products/views/store/store.component';
import { SukiListComponent } from './views/suki-list/suki-list.component';

const routes: Routes = [
  {
    path: 'user-suki-list',
    component: SukiListComponent
  },
  {
    path: '',
    redirectTo: 'user-suki-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SukiListRoutingModule { }
