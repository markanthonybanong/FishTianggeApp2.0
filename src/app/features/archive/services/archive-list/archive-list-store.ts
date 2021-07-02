import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { ArchiveListEndpoint } from './archive-list-endpoint';
import { ArchiveListStoreState } from './archive-list-store-state';

@Injectable()
export class ArchiveListStore extends Store<ArchiveListStoreState>{
    constructor(
        private storeDataService: StoreDataService,
        private storageService: StorageService,
        private endpoint: ArchiveListEndpoint,
        private router: Router
    ){
        super(new ArchiveListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.getArchiveProducts(null, user.storeId);
    }
    async getArchiveProducts($event = null, storeId: string): Promise<void> {
        try {
            const products = await this.endpoint.getArchieveStoreProducts({storeId}, this.storeDataService.storeRequestStateUpdater);
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
        this.getArchiveProducts($event, user.storeId);
    }
    onProductClick(product: any): void {
        this.router.navigateByUrl(`archive/archive/${product.productId}/${product.productName}`);
    }
    onSearchProducts($event: any): void {
        const query          = $event.target.value.toLowerCase();
        const searchProducts = this.state.products.filter( (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
        this.setState({
            ...this.state,
            searchProducts
        });
    }
}
