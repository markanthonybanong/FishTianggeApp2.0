import { Component, OnInit } from '@angular/core';
import { ProductListEndpoint } from '../../services/product-list/product-list-endpoint';
import { ProductListStore } from '../../services/product-list/product-list-store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductListStore, ProductListEndpoint]
})
export class ProductListComponent implements OnInit {

  constructor(
    public store: ProductListStore
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
