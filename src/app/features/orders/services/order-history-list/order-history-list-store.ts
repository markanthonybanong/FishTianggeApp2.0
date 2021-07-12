import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { StorageService } from '@fish-tiangge/shared/services';
import { LoginUser, Order } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { OrderHistoryListEndpoint } from './order-history-list-endpoint';
import { OrderHistoryListStoreState } from './order-history-list-store-state';

@Injectable()
export class OrderHistoryListStore extends Store<OrderHistoryListStoreState> {
    constructor(
        private storeDataSerivce: StoreDataService,
        private storageService: StorageService,
        private endpoint: OrderHistoryListEndpoint,
        private router: Router
    ){
        super(new OrderHistoryListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataSerivce.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            userId: user.id,
            userType: user.userType,
            storeId: user.storeId
        });
        if(this.state.userType === 'Seller'){
            this.getStoreDeliveredOrders();
        } else {
            this.getBuyerDeliveredOrders();
        }
    }
    async getStoreDeliveredOrders($event = null): Promise<void> {
        try {
            const deliveredOrders = await this.endpoint.getStoreDeliveredOrders(
                                        {storeId: this.state.storeId},
                                        this.storeDataSerivce.storeRequestStateUpdater
                                    );
            this.setState({
                ...this.state,
                deliveredOrders,
                searchDeliveredOrders: deliveredOrders
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
    async getBuyerDeliveredOrders($event = null): Promise<void> {
        try {
            const deliveredOrders = await this.endpoint.getDeliveredBuyerOrders(
                                        {userId: this.state.userId},
                                        this.storeDataSerivce.storeRequestStateUpdater
                                    );
            this.setState({
                ...this.state,
                deliveredOrders,
                searchDeliveredOrders: deliveredOrders
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
    onSearchDeliveredOrders($event: any): void{
        const query                 = $event.target.value.toLowerCase();
        const searchDeliveredOrders = this.state.deliveredOrders.filter(
                                        (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) > -1
                                      );
        this.setState({
            ...this.state,
            searchDeliveredOrders
        });
    }
    onRefresh($event): void{
        if(this.state.userType === 'Seller'){
            this.getStoreDeliveredOrders($event);
        } else {
            this.getBuyerDeliveredOrders($event);
        }
    }
    onOrderClick(order: Order): void{
        // eslint-disable-next-line max-len
        this.router.navigateByUrl(`orders/order/historyList/${order.id}/${order.name}/${order.status}/${order.seller_status}/${order.store_id}`);
    }
}
