import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { ImageService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { ProductListEndpoint } from './product-list-endpoint';
import { ProductListStoreState } from './product-list-store-state';

@Injectable()
export class ProductListStore extends Store<ProductListStoreState>  {
    constructor(
        private storageService: StorageService,
        private endpoint: ProductListEndpoint,
        private storeDataService: StoreDataService,
        private imageService: ImageService,
        private router: Router
    ){
        super(new ProductListStoreState());
    }

    async init(): Promise<void>{
        const user: LoginUser = await this.storageService.get('loginUser');
        if(user.userType === 'Seller'){
            this.getStoreProducts(user.storeId);
        } else {
            this.getAllStoreProducts();
        }
    }
    async getStoreProducts(storeId: string, $event = null): Promise<void>{
        try {
            const products = await this.endpoint.getStoreProducts({storeId}, this.storeDataService.storeRequestStateUpdater);
            this.setState({
                ...this.state,
                products,
                searchProducts: products
            });
            if ($event) {
                $event.target.complete();
            }
        } catch (error) {
            if ($event){
                $event.target.complete();
            }
        }
    }
    async getAllStoreProducts($event = null): Promise<void>{
        try {
           const products = await this.endpoint.getAllStoreProducts(this.storeDataService.storeRequestStateUpdater);
           this.setState({
            ...this.state,
            products,
            searchProducts: products
          });
          if ($event) {
              $event.target.complete();
          }
        } catch (error) {
          if ($event) {
              $event.target.complete();
          }
        }
    }
    async onRefresh($event): Promise<void>{
        const user: LoginUser = await this.storageService.get('loginUser');
        if(user.userType === 'Seller'){
            this.getStoreProducts(user.storeId, $event);
        } else {
            this.getAllStoreProducts($event);
        }
    }
    onSearchProducts($event: any): void {
        const query          = $event.target.value.toLowerCase();
        const searchProducts = this.state.products.filter( (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
        this.setState({
            ...this.state,
            searchProducts
        });
    }

    async onProductClick($event: any): Promise<void>{
        const user: LoginUser = await this.storageService.get('loginUser');
        if(user.userType === 'Seller'){
            this.router.navigateByUrl(`products/products-list/product/update/${$event.id}/${$event.name}`);
        } else {
            this.router.navigateByUrl(`products/products-list/product/addToCart/${$event.id}/${$event.name}`);
        }
    }
}
