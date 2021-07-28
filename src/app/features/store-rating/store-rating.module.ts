import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRatingRoutingModule } from './store-rating-routing.module';
import { StoreRatingListComponent } from './views/store-rating-list/store-rating-list.component';
import { StoreRatingComponent } from './views/store-rating/store-rating.component';
import { StarRatingModule } from 'ionic5-star-rating';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StoreRatingListComponent,
    StoreRatingComponent
  ],
  imports: [
    CommonModule,
    StoreRatingRoutingModule,
    StarRatingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreRatingModule { }
