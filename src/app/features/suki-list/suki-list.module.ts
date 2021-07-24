import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SukiListRoutingModule } from './suki-list-routing.module';
import { SukiListComponent } from './views/suki-list/suki-list.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    SukiListComponent
  ],
  imports: [
    CommonModule,
    SukiListRoutingModule,
    IonicModule
  ]
})
export class SukiListModule { }
