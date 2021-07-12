import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { OrderStatus } from '@fish-tiangge/shared/enums';
import { clearDeliverFormValue, formatDate, getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser, User } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { setDeliverFormUsingDeliver } from '@fish-tiangge/shared/helpers';
import { setDeliverFormUsingOrder } from '../../helpers/order/set-deliver-form-using-order';
import { OrderEndpoint } from './order-endpoint';
import { OrderStoreState } from './order-store-state';
import { ModalController } from '@ionic/angular';
import { ModalRatingComponent } from '../../modals/order/modal-rating/modal-rating.component';

@Injectable()
export class OrderStore extends Store<OrderStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private router: Router,
        private dataService: OrderDataService,
        private endpoint: OrderEndpoint,
        private storageService: StorageService,
        private popOverService: PopOverService,
        private modalController: ModalController,
        private orderDataService: OrderDataService
    ){
        super( new OrderStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        clearDeliverFormValue(this.dataService.deliverForm);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            userType: user.userType,
            loginUserId: user.id
        });
        this.getCouriers();
        this.getOrder();
        this.canAddRating();
    }
    /**
     * At first its going to get the order and then will add that order to deliveries table
     */
    async getOrder(): Promise<void>{
       try {
           if(this.state.orderStatus === OrderStatus.NONE || this.state.orderSellerStatus === OrderStatus.DECLINE){
               const order = await this.endpoint.getOrder({orderId: this.state.orderId}, this.storeDataService.storeRequestStateUpdater);
               setDeliverFormUsingOrder(order, this.dataService.deliverForm);
           } else {
               const deliver = await this.endpoint.getToDeliver(
                                {orderId: this.state.orderId},
                                this.storeDataService.storeRequestStateUpdater
                              );
                this.setState({
                    ...this.state,
                    courierName: deliver.courier_name
                });
                setDeliverFormUsingDeliver(deliver, this.dataService.deliverForm);
           }
       } catch (error) {}
    }
    /**
     * Seller can also be a courier
     */
    async getCouriers(): Promise<void>{
        try {
            const couriers = await this.endpoint.getCouriers(this.storeDataService.storeRequestStateUpdater);
            if(this.state.userType === 'Seller'){
                 const seller = await this.endpoint.getUser(
                                    {userId: this.state.loginUserId},
                                    this.storeDataService.storeRequestStateUpdater
                                );
                 couriers.unshift(seller);
            }
            this.setState({
                ...this.state,
                couriers,
            });
        } catch (error) {}
    }
    onCourierOk($event: any): void {
        const courierId = $event.detail.value;
        const couriers: User[] = this.state.couriers;
        for (const courier of couriers) {
            if (courierId === courier.id) {
                this.dataService.deliverForm.get('courierPhoneNum').patchValue(courier.phone_number);
                this.dataService.deliverForm.get('courierId').patchValue(courierId);
                this.dataService.deliverForm.get('courierName').patchValue(`${courier.first_name} ${courier.last_name}`);
                this.setState({
                    ...this.state,
                    courierName: `${courier.first_name} ${courier.last_name}`
                });
                break;
            }
        }
    }
    async onSubmit(form: FormGroup): Promise<void>{
        if( this.state.orderStatus === OrderStatus.ACCEPT || this.state.orderStatus === OrderStatus.ONTHEWAY ){
            this.popOverService.showPopUp('Product Already Accepted By Courier');
        } else {
            try {
                if(this.state.orderStatus === OrderStatus.NONE || this.state.orderSellerStatus === OrderStatus.DECLINE){
                    const deliver = await this.endpoint.addToDeliver(form.value, this.storeDataService.storeRequestStateUpdater);
                    await this.endpoint.updateOrderStatus(
                        {id: this.state.orderId, orderStatus: OrderStatus.PENDING},
                        this.storeDataService.storeRequestStateUpdater
                    );
                    this.dataService.deliverForm.get('id').patchValue(deliver.id);
                    this.popOverService.showPopUp('Product To Be Deliver');
                } else {
                    await this.endpoint.updateToDeliver(form.value, this.storeDataService.storeRequestStateUpdater);
                    this.popOverService.showPopUp('Updated Product To Be Deliver');
                }
                this.setState({
                    ...this.state,
                    orderStatus: OrderStatus.PENDING
                });
            } catch (error) {}
        }
    }
    onBack(): void{
        if(this.state.routedFrom === 'orderList'){
            this.router.navigateByUrl('orders/order-list');
        } else {
            this.router.navigateByUrl('orders/order-history-list');
        }
    }
    async onAddRating(): Promise<void>{
        const modal = await this.modalController.create({
                component: ModalRatingComponent,
                componentProps: {
                    storeId: this.state.storeId,
                    orderId: this.state.orderId,
                    userId: this.state.loginUserId
                }
            });
        await modal.present();
        const rating = await modal.onWillDismiss();
        if(rating.data !== undefined){
            this.orderDataService.ratingForm.get('storeId').patchValue(this.state.storeId);
            this.orderDataService.ratingForm.get('orderId').patchValue(this.state.orderId);
            this.orderDataService.ratingForm.get('userId').patchValue(this.state.loginUserId);
            this.orderDataService.ratingForm.get('starNumber').patchValue(rating.data.starNumber);
            this.orderDataService.ratingForm.get('userComment').patchValue(rating.data.userComment);
            this.orderDataService.ratingForm.get('dateRate').patchValue(formatDate(new Date()));
            try {
                await this.endpoint.addRating(this.orderDataService.ratingForm.value, this.storeDataService.storeRequestStateUpdater);
                this.setState({
                    ...this.state,
                    warningMsg: 'Added Store Rating',
                    alreadyAddedStoreRating: true,
                });
            } catch (error) {
                this.popOverService.showPopUp('Something went wrong!!!');
            }
        }
    }
    async canAddRating(): Promise<void>{
        if(this.state.userType === 'Buyer' && this.state.orderStatus === OrderStatus.DELIVER){
            const rating = await this.endpoint.selectRatingByUserId(
                           {userId: this.state.loginUserId, orderId: this.state.orderId},
                           this.storeDataService.storeRequestStateUpdater
                           );
            if(rating !== null){
                this.setState({
                    ...this.state,
                    warningMsg: 'Added Store Rating',
                    alreadyAddedStoreRating: true,
                });
            }
        }
    }

}
