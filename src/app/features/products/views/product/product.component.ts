import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDataService } from '@fish-tiangge/shared/data-service';
import { MenuController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { ProductEndpoint } from '../../services/product/product-endpoint';
import { ProductStore } from '../../services/product/product-store';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductStore, ProductEndpoint]
})
export class ProductComponent {

  constructor(
    public store: ProductStore,
    public dataService: ProductDataService,
    private route: ActivatedRoute,
    private menu: MenuController
  ) { }
  ionViewWillEnter() {
    this.subscribeToRouteParameter();
    this.store.init();
  }
  openMenu(): void {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }
  private subscribeToRouteParameter(): void {
    this.route.paramMap
     .pipe(
      tap((params) => {
        this.store.setState({
          ...this.store.state,
          actionType: params.get('actionType'),
          productName: params.get('productName'),
          productId: params.get('productId')
        });
      })
     ).subscribe();
  }

}
