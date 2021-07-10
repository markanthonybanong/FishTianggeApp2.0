import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliverHistoryListComponent } from './views/deliver-history-list/deliver-history-list.component';
import { DeliverListComponent } from './views/deliver-list/deliver-list.component';
import { DeliverComponent } from './views/deliver/deliver.component';
import { DeliveriesComponent } from './views/deliveries/deliveries.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveriesComponent,
    children: [
     {
      path: 'deliver-list',
      component: DeliverListComponent,
     },
     {
       path: 'deliver-history-list',
       component: DeliverHistoryListComponent
     },
     {
       path: '',
       redirectTo: 'deliver-list',
       pathMatch: 'full',
     }
    ]
  },
  {
    path: 'deliver/:routedFrom/:deliverId/:deliverName/:deliverStatus',
    component: DeliverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveriesRoutingModule { }
