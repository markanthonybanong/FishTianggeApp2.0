import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { DeliverListEndpoint } from './deliver-list-endpoint';
import { DeliverListStoreState } from './deliver-list-store-state';

@Injectable()
export class DeliverListStore extends Store<DeliverListStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private endpoint: DeliverListEndpoint,
        private storageService: StorageService,
        private router: Router
    ){
        super(new DeliverListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            userId: user.id
        });
        this.getCourierPendingDeliveries();
    }
    async getCourierPendingDeliveries($event: any = null): Promise<void>{
        try {
            const deliveries = await this.endpoint.getCourierPendingDeliveries(
                                {courierId: this.state.userId},
                                this.storeDataService.storeRequestStateUpdater
                               );
            this.setState({
                ...this.state,
                deliveries,
                searchDeliveries: deliveries
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
    onSearchPendingDeliveries($event: any): void {
        const query            = $event.target.value.toLowerCase();
        const searchDeliveries = this.state.deliveries.filter( (delivery) => delivery.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
        this.setState({
            ...this.state,
            searchDeliveries
        });
    }
    onRefresh($event: any): void{
        this.getCourierPendingDeliveries($event);
    }
    onDeliverClick(deliver: any): void{
        this.router.navigateByUrl(`deliveries/deliver/deliverList/${deliver.id}/${deliver.name}/${deliver.status}`);
    }
}
