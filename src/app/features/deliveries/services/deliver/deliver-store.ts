import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { OrderStatus } from '@fish-tiangge/shared/enums';
import { clearDeliverFormValue, getStoreRequestStateUpdater, setDeliverFormUsingDeliver } from '@fish-tiangge/shared/helpers';
import { CourierMapService, PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { GlobalStore } from 'src/app/global-store/global-store';
import { DeliverEndpoint } from './deliver-endpoint';
import { DeliverStoreState } from './deliver-store-state';

@Injectable()
export class DeliverStore extends Store<DeliverStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private orderDataService: OrderDataService,
        private endpoint: DeliverEndpoint,
        private popOverService: PopOverService,
        private router: Router,
        private courMapService: CourierMapService,
        private storageService: StorageService
    ){
        super(new DeliverStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const loginUser: LoginUser                     = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            courierId: loginUser.id
        });
        clearDeliverFormValue(this.orderDataService.deliverForm);
        this.getCourierToDeliverProduct();
    }
    async getCourierToDeliverProduct(): Promise<void>{
        try {
            const deliver = await this.endpoint.getCourierToDeliverProduct(
                                {deliverId: this.state.deliverId},
                                this.storeDataService.storeRequestStateUpdater
                            );
            this.setState({
                ...this.state,
                orderId: deliver.order_id
            });
            setDeliverFormUsingDeliver(deliver, this.orderDataService.deliverForm);
            if(deliver.status !== OrderStatus.PENDING) {
                this.orderDataService.deliverForm.get('deliveryStatusHolder').patchValue(deliver.status);
            }
        } catch (error) {
        }
    }
    async onSubmit(form: FormGroup): Promise<void>{
        try {
            const deliveryStatus = form.get('deliveryStatus').value;
            if(deliveryStatus === OrderStatus.DECLINE) {
                //for seller status
                await this.endpoint.updateOrderSellerStatus(
                    {id: this.state.orderId, orderSellerStatus: deliveryStatus},
                    this.storeDataService.storeRequestStateUpdater
                );
                await this.endpoint.deleteToDeliver(form.get('id').value, this.storeDataService.storeRequestStateUpdater);
            } else {
                //for buyer status
                await this.endpoint.updateOrderStatus(
                    {id: this.state.orderId, orderStatus: deliveryStatus},
                    this.storeDataService.storeRequestStateUpdater
                );
                await this.endpoint.updateToDeliverStatus(
                    {id: this.state.deliverId, status: deliveryStatus},
                    this.storeDataService.storeRequestStateUpdater
                );
            }

            if(deliveryStatus === OrderStatus.ONTHEWAY){//IMPROVE THIS LATER
                this.courMapService.watchCourierPosition(this.state.courierId);
            }
            this.popOverService.showPopUp('Updated Order Status');
        } catch (error) {
        }
    }
    onBack(): void{
        if(this.state.routedFrom === 'deliverList'){
            this.router.navigateByUrl('deliveries');
        } else {
            this.router.navigateByUrl('deliveries/deliver-history-list');
        }
    }
    onStatusOk(status: string): void {
        this.orderDataService.deliverForm.get('deliveryStatusHolder').patchValue(status);
    }
}
