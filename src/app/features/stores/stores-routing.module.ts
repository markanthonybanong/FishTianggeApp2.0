import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyStoreComponent } from './views/my-store/my-store.component';

const routes: Routes = [
  {
    path: 'my-store',
    component: MyStoreComponent
  },
  {
    path: '',
    redirectTo: 'my-store',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
