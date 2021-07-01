import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { ProductsStoreState } from './products-store-state';
@Injectable()
export class ProductsStore extends Store<ProductsStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private storageService: StorageService,
        private router: Router
    ){
        super(new ProductsStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        if(user.userType === 'Seller'){
            this.setState({
                ...this.state,
                userType: 'Seller'
            });
        }
    }
    onSegmentChanged($event: any): void {
        if ($event.detail.value === 'myProducts') {
            this.router.navigateByUrl('products/product-list');
        }else {
            this.router.navigateByUrl('products/add/add');
        }
    }

}
