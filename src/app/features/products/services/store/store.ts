/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { StoreState } from './store-state';
import { Store as StoreRxJs} from 'rxjs-observable-store';
import { Router } from '@angular/router';

@Injectable()
export class Store extends StoreRxJs<StoreState>{
    constructor(
        private router: Router
    ){
        super(new StoreState());
    }
    init(): void{
        if(this.state.isFirstLoad){
            this.router.navigateByUrl(`products/store-list/store/${this.state.storeId}/${this.state.storeName}/product-list/${this.state.storeId}/${this.state.storeName}`);
        }
    }
    onSegmentChanged($event: any): void{
        this.setState({
            ...this.state,
            isFirstLoad: false
        });
        if($event.detail.value === 'products'){
            this.router.navigateByUrl(`products/store-list/store/${this.state.storeId}/${this.state.storeName}/product-list/${this.state.storeId}/${this.state.storeName}`);
        } else {
            this.router.navigateByUrl(`products/store-list/store/${this.state.storeId}/${this.state.storeName}/rating-list/${this.state.storeId}/${this.state.storeName}`);
        }
    }
    onBackToStoreList(): void{
        this.router.navigateByUrl('products/store-list');
    }
}
