import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyAccountComponent } from './views/my-account/my-account.component';


@NgModule({
  declarations: [
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ]
})
export class MyAccountModule { }
