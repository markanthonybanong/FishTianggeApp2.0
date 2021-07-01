import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDataService } from '@fish-tiangge/shared/data-service';
import { tap } from 'rxjs/operators';
import { ProductEndpoint } from '../../services/product/product-endpoint';
import { ProductStore } from '../../services/product/product-store';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductStore, ProductEndpoint]
})
export class ProductComponent implements OnInit {

  constructor(
    public store: ProductStore,
    public dataService: ProductDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscribeToRouteParameter();
    this.store.init();
  }
  private subscribeToRouteParameter(): void {
    this.route.paramMap
     .pipe(
      tap((params) => {
        let sellerBtnName: string = null;
        if(params.get('actionType') === 'add'){
          sellerBtnName = 'Add';
        } else {
          sellerBtnName = 'Update';
        }
        this.store.setState({
          ...this.store.state,
          actionType: params.get('actionType'),
          sellerBtnName,
          productName: params.get('productName'),
          productId: params.get('productId')
        });
      })
     ).subscribe();
  }
}
