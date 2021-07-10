import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesRoutingModule } from './deliveries-routing.module';
import { DeliveriesComponent } from './views/deliveries/deliveries.component';
import { DeliverListComponent } from './views/deliver-list/deliver-list.component';
import { DeliverHistoryListComponent } from './views/deliver-history-list/deliver-history-list.component';
import { DeliverComponent } from './views/deliver/deliver.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DeliveriesComponent,
    DeliverListComponent,
    DeliverHistoryListComponent,
    DeliverComponent
  ],
  imports: [
    CommonModule,
    DeliveriesRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DeliveriesModule { }
