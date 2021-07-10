import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { StorageService } from '@fish-tiangge/shared/services';
import { Deliver, LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { DeliverHistoryListEndpoint } from './deliver-history-list-endpoint';
import { DeliverHistoryListStoreState } from './deliver-history-list-store-state';

@Injectable()
export class DeliverHistoryListStore extends Store<DeliverHistoryListStoreState>{
    constructor(
        private storeDataService: StoreDataService,
        private storageService: StorageService,
        private endpoint: DeliverHistoryListEndpoint,
        private router: Router
    ){
        super(new DeliverHistoryListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            userId: user.id
        });
        this.getCourierDeliverHistory();
    }
    async getCourierDeliverHistory($event = null): Promise<void> {
        try {
            const deliveries = await this.endpoint.getCourierDeliveredDeliveries(
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
    onSearchDeliveredDeliveries($event: any): void{
        const query            = $event.target.value.toLowerCase();
        const searchDeliveries = this.state.deliveries.filter( (delivery) => delivery.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
        this.setState({
            ...this.state,
            searchDeliveries
        });
    }
    onRefresh($event: any): void{
        this.getCourierDeliverHistory($event);
    }
    onDeliverClick(deliver: Deliver): void{
        this.router.navigateByUrl(`deliveries/deliver/deliverHistoryList/${deliver.id}/${deliver.name}/${deliver.status}`);
    }
}
