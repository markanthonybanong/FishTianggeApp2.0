import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { Store } from 'rxjs-observable-store';
import { StoreListEndpoint } from './store-list-endpoint';
import { StoreListStoreState } from './store-list-store-state';

@Injectable()
export class StoreListStore extends Store<StoreListStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private endpoint: StoreListEndpoint,
        private router: Router
    ){
        super(new StoreListStoreState());
    }
    init(): void{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.getStores();
    }
    async getStores($event: any = null): Promise<void>{
        try {
            const stores = await this.endpoint.getStores(this.storeDataService.storeRequestStateUpdater);
            this.setState({
                stores,
                searchStores: stores
            });
            if($event){
                $event.target.complete();
            }
        } catch (error) {
            if($event){
                $event.target.complete();
            }
        }
    }
    onRefresh($event: any): void{
        this.getStores($event);
    }
    onSearchStores($event: any): void{
        const query        = $event.target.value.toLowerCase();
        const searchStores = this.state.stores.filter( (store) => store.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
        this.setState({
            ...this.state,
            searchStores
        });
    }
    onStoreClick(store: any): void{
        this.router.navigateByUrl(`products/store-list/store/${store.id}/${store.name}`);
    }

}
