import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CourierMapService } from '@fish-tiangge/shared/services';
import { Store } from 'rxjs-observable-store';
import { OrderLocationStoreState } from './order-location-store-state';
import { io } from 'socket.io-client';
import { APP_CONFIG } from 'src/app/app.config';
import { CourierPosition } from '@fish-tiannge/shared/types';
import { OrderLocationEndpoint } from './order-location-endpoint';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
@Injectable()
export class OrderLocationStore extends Store<OrderLocationStoreState>{
    private socket = io(APP_CONFIG.apiUrl);

    constructor(
        private router: Router,
        private courMapService: CourierMapService,
        private endpoint: OrderLocationEndpoint,
        private storeDataService: StoreDataService
    ){
        super(new OrderLocationStoreState());
        this.socket.on('connect', () =>{
        });
    }
    init(): void{
       this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
       this.courMapService.loadMap();
       this.getToDeliver();
       this.getCourierPosition();
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
        } catch (error) {
        }
    }
    async getCourierPosition(): Promise<void>{
        this.socket.on('get-courier-location', (couriersPositions: CourierPosition[]) =>{
            const latestcourPosition = couriersPositions.find(postion => postion.courierId === this.state.courierId);
            if(latestcourPosition !== undefined){
                console.log('latest cour position order loc', latestcourPosition);
                this.courMapService.updateMapmarker(latestcourPosition.lat, latestcourPosition.lng);
            }
       });
    }
}
