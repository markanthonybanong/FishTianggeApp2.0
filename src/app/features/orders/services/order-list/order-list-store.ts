import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { OrderStatus } from '@fish-tiangge/shared/enums';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { StorageService } from '@fish-tiangge/shared/services';
import { LoginUser, Order, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { OrderListEndpoint } from './order-list-endpoint';
import { OrderListStoreState } from './order-list-store-state';

@Injectable()
export class OrderListStore extends Store<OrderListStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private storageService: StorageService,
        private endpoint: OrderListEndpoint,
        private router: Router
    ){
        super(new OrderListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            userType: user.userType,
            userId: user.id,
            storeId: user.storeId
        });
        if(this.state.userType === 'Seller'){
            this.getStoreOrdersByStatus();
        } else {
            this.getBuyerPendingOrders();
        }
    }
    async getStoreOrdersByStatus($event = null): Promise<void>{
        try {
            let orders: Array<Order> = [];
            if(this.state.orderStatus === OrderStatus.NONE){
                orders = await this.endpoint.getStoreNoneOrders(
                    {storeId: this.state.storeId},
                    this.storeDataService.storeRequestStateUpdater
                   );
            } else if(this.state.orderStatus === OrderStatus.PENDING) {
                orders = await this.endpoint.getStorePendingOrders(
                    {storeId: this.state.storeId},
                    this.storeDataService.storeRequestStateUpdater
                   );
            } else if(this.state.orderStatus === OrderStatus.ACCEPT) {
                orders = await this.endpoint.getStoreAcceptOrders(
                    {storeId: this.state.storeId},
                    this.storeDataService.storeRequestStateUpdater
                   );
            } else if(this.state.orderStatus === OrderStatus.DECLINE) {
                orders = await this.endpoint.getStoreDeclineOrders(
                    {storeId: this.state.storeId},
                    this.storeDataService.storeRequestStateUpdater
                   );
            } else if(this.state.orderStatus === OrderStatus.ONTHEWAY) {
                orders = await this.endpoint.getStoreOnTheWayOrders(
                    {storeId: this.state.storeId},
                    this.storeDataService.storeRequestStateUpdater
                   );
            } else if(this.state.orderStatus === OrderStatus.DELIVER) {
                orders = await this.endpoint.getStoreDeliverOrders(
                    {storeId: this.state.storeId},
                    this.storeDataService.storeRequestStateUpdater
                   );
            } else {
                orders = await this.endpoint.getStoreAllOrders(
                    {storeId: this.state.storeId},
                    this.storeDataService.storeRequestStateUpdater
                   );
            }

            this.setState({
                ...this.state,
                pendingOrders: orders,
                searchPendingOrders: orders
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
    async getBuyerPendingOrders($event = null): Promise<void>{
        try {
            const pendingOrders = await this.endpoint.getBuyerPendingOrders(
                                    {userId: this.state.userId},
                                    this.storeDataService.storeRequestStateUpdater
                                  );
            this.setState({
                ...this.state,
                pendingOrders,
                searchPendingOrders: pendingOrders
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
    onSearchPendingOrders($event: any): void{
        const query               = $event.target.value.toLowerCase();
        const searchPendingOrders = this.state.pendingOrders.filter( (order) => order.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
        this.setState({
            ...this.state,
            searchPendingOrders
        });
    }
    onRefresh($event: any): void{
        if(this.state.userType === 'Seller'){
            this.getStoreOrdersByStatus($event);
        } else {
            this.getBuyerPendingOrders($event);
        }
    }
    onOrderClick(order: Order): void{
        // eslint-disable-next-line max-len
        this.router.navigateByUrl(`orders/order/orderList/${order.id}/${order.name}/${order.status}/${order.seller_status}/${order.store_id}`);
    }
    getOrderStatus(order: Order): void{
        let status = null;
        if(this.state.userType === 'Seller'){
            status = order.seller_status;
        } else {
            status = order.status;
        }
        return status;
    }
    onSetOrderStatus($event: any): void{
        this.setState({
            ...this.state,
            orderStatus: $event.detail.value
        });
        this.getStoreOrdersByStatus();
    }
}
