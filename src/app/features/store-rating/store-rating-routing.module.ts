import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreRatingListComponent } from './views/store-rating-list/store-rating-list.component';
import { StoreRatingComponent } from './views/store-rating/store-rating.component';

const routes: Routes = [
  {
    path: 'store-rating-list',
    component: StoreRatingListComponent
  },
  {
    path: 'store-rating/:id/:rateBy',
    component: StoreRatingComponent
  },
  {
    path: '',
    redirectTo: 'store-rating-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRatingRoutingModule { }
