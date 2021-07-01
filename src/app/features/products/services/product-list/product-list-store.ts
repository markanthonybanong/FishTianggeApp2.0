import { Injectable } from '@angular/core';
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
        private imageService: ImageService
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
                products: this.imageService.setSafeUrlToBase64Img(products, 'img')
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
            products: this.imageService.setSafeUrlToBase64Img(products, 'img')
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
}
