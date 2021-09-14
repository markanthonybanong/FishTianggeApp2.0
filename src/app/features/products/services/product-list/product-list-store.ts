/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { ImageService, PopOverService, StorageService } from '@fish-tiangge/shared/services';
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
        private router: Router,
        private popOverService: PopOverService
    ){
        super(new ProductListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            userType: user.userType
        });
        if(this.state.userType === 'Seller'){
            this.setState({
                ...this.state,
                storeId: user.storeId
            });
            this.getStoreProducts(this.state.storeId);
        } else if(this.state.userType === 'Buyer' && this.state.getStoreProducts){
            this.getStoreProductsForBuyer(this.state.storeId);
        } else {
            this.getAllStoreProducts(); //buyer
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
    async getStoreProductsForBuyer(storeId: string, $event = null): Promise<void>{
        try {
            const products = await this.endpoint.getStoreProductsForBuyer({storeId}, this.storeDataService.storeRequestStateUpdater);
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
   onRefresh($event: any): void{
        if(this.state.userType === 'Seller'){
            this.getStoreProducts(this.state.storeId, $event);
        } else if(this.state.userType === 'Buyer' && this.state.getStoreProducts) {
            this.getStoreProductsForBuyer(this.state.storeId, $event);
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
    onProductClick($event: any): void{
        if(this.state.userType === 'Seller'){
            this.router.navigateByUrl(`products/products-list/product/update/${$event.id}/${$event.name}`);
        } else if(this.state.userType === 'Buyer' && this.state.getStoreProducts) {
            this.router.navigateByUrl(`products/store-list/products/product/addToCart/${$event.id}/${$event.name}/${this.state.storeId}/${this.state.storeName}`);
        } else {
            this.router.navigateByUrl(`products/products-list/product/addToCart/${$event.id}/${$event.name}`);
        }
    }
}
