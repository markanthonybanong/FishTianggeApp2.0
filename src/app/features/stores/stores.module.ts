import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresRoutingModule } from './stores-routing.module';
import { MyStoreComponent } from './views/my-store/my-store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreListComponent } from './views/store-list/store-list.component';
import { ProductListComponent } from '../products/views/product-list/product-list.component';


@NgModule({
  declarations: [
    MyStoreComponent,
    StoreListComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    StoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class StoresModule { }
