import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '@fish-tiangge/shared/services';
import { filter, tap } from 'rxjs/operators';
import { GlobalStore } from 'src/app/global-store/global-store';
import { ProductListEndpoint } from '../../services/product-list/product-list-endpoint';
import { ProductListStore } from '../../services/product-list/product-list-store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductListStore, ProductListEndpoint]
})
export class ProductListComponent  {

  constructor(
    public store: ProductListStore,
    public imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter(): void {
    this.subscribeToRouteParameter();
    this.store.init();
  }
  subscribeToRouteParameter(): void{
    this.route.paramMap.pipe(
      filter((params) => params.get('storeId') !== null || params.get('storeName') !== null),
      tap((params) =>{
        this.store.setState({
          ...this.store.state,
          storeId: params.get('storeId'),
          storeName: params.get('storeName'),
          getStoreProducts: true,
        });
      })
    ).subscribe();
  }

}
