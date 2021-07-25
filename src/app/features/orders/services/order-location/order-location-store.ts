import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CourierMapService } from '@fish-tiangge/shared/services';
import { Store } from 'rxjs-observable-store';
import { OrderLocationStoreState } from './order-location-store-state';
import { APP_CONFIG } from 'src/app/app.config';
import { CourierPosition } from '@fish-tiannge/shared/types';
import { OrderLocationEndpoint } from './order-location-endpoint';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
@Injectable()
export class OrderLocationStore extends Store<OrderLocationStoreState>{
    private interValId: any;
    constructor(
        private router: Router,
        private courMapService: CourierMapService,
        private endpoint: OrderLocationEndpoint,
        private storeDataService: StoreDataService
    ){
        super(new OrderLocationStoreState());
    }
    init(): void{
       this.courMapService.loadMap(this.state.lat, this.state.lng);
       this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
       this.getToDeliver();
    }
    onBackBtn(): void{
        // eslint-disable-next-line max-len
        this.router.navigateByUrl(`orders/order/orderList/${this.state.orderId}/${this.state.orderName}/${this.state.orderStatus}/${this.state.orderSellerStatus}/${this.state.storeId}`);
    }
    async getToDeliver(): Promise<void>{
        try {
            const deliver = await this.endpoint.getToDeliver(
                            {orderId: this.state.orderId},
                            this.storeDataService.storeRequestStateUpdater
                            );
            this.setState({
                ...this.state,
                courierId: deliver.courier_id
            });
            this.getCourierPosition();
        } catch (error) {
        }
    }
    getCourierPosition(): void{
        this.interValId = setInterval(() =>{
            const latestcourPosition = this.courMapService.courierPositions.find(postion => postion.courierId === this.state.courierId);
            this.courMapService.updateMapmarker(latestcourPosition.lat, latestcourPosition.lng);
        }, 5000); //update marker very five seconds, althought geolocation will give new value every 18 secs
    }
    clearInterVal(): void{
        clearInterval(this.interValId);
    }

}
