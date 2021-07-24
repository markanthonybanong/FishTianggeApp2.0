import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService, StoreProductDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { GlobalStore } from 'src/app/global-store/global-store';
import { SukiListEndpoint } from './suki-list-endpoint';
import { SukiListStoreState } from './suki-list-store-state';

@Injectable()
export class SukiListStore extends Store<SukiListStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private storageService: StorageService,
        private endpoint: SukiListEndpoint,
        private router: Router,
        private globalStore: GlobalStore
    ){
        super(new SukiListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            loginUserId: user.id
        });
        this.getSukiList();
    }
    async getSukiList($event: any = null): Promise<void>{
        try {
            const stores = await this.endpoint.getSukilist({id: this.state.loginUserId}, this.storeDataService.storeRequestStateUpdater);
            this.setState({
                ...this.state,
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
        this.getSukiList($event);
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
        this.globalStore.setState({
            ...this.globalStore.state,
            storeRoutedFrom: 'sukiList'
        });
        this.router.navigateByUrl(`products/store-list/store/${store.id}/${store.name}`);
    }

}
