/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { OrderStatus, UserType } from '@fish-tiangge/shared/enums';
import { clearDeliverFormValue, formatDate, getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { GeolocationService, PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { CourierPosition, LoginUser, User } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { setDeliverFormUsingDeliver } from '@fish-tiangge/shared/helpers';
import { setDeliverFormUsingOrder } from '../../helpers/order/set-deliver-form-using-order';
import { OrderEndpoint } from './order-endpoint';
import { OrderStoreState } from './order-store-state';
import { ModalController } from '@ionic/angular';
import { ModalRatingComponent } from '../../modals/order/modal-rating/modal-rating.component';
import { ModalReportComponent } from '../../modals/order/modal-report/modal-report.component';

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
        private orderDataService: OrderDataService,
        private courMapService: GeolocationService
    ){
        super( new OrderStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        clearDeliverFormValue(this.dataService.deliverForm);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            warningMsgs: [],
            alreadyAddedStoreRating: false,
            alreadyAddedStoreReport: false,
            userType: user.userType,
            loginUserId: user.id
        });
        this.getCouriers();
        this.getOrder();
        this.canAddRating();
        this.canAddReport();
        this.getToDeliver();
        this.getOrderCourierId();// to verify if it is really needed
    }
    /**
     * At first its going to get the order and then will add that order to deliveries table
     */
    async getOrder(): Promise<void>{
       try {
           if(this.state.orderStatus === OrderStatus.NONE || this.state.orderSellerStatus === OrderStatus.DECLINE){
               const order = await this.endpoint.getOrder({orderId: this.state.orderId}, this.storeDataService.storeRequestStateUpdater);
               this.setState({
                 ...this.state,
                 customerAddressLat: order.customer_address_lng,
                 customerAddressLng: order.customer_address_lng,
               });
               if(order.classification_buyer !== null){
                   this.setState({
                        ...this.state,
                        haveBuyerClassification: true
                   });
               }
               setDeliverFormUsingOrder(order, this.dataService.deliverForm);
           } else {
               const deliver = await this.endpoint.getToDeliver(
                                {orderId: this.state.orderId},
                                this.storeDataService.storeRequestStateUpdater
                              );
                if(deliver.classification_buyer !== null){
                                this.setState({
                                     ...this.state,
                                     haveBuyerClassification: true
                                });
                }
                this.setState({
                    ...this.state,
                    customerAddressLat: deliver.customer_address_lat,
                    customerAddressLng: deliver.customer_address_lng,
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
        try {
            const toDeliver = await this.endpoint.getToDeliver(
                                {orderId: this.state.orderId},this.storeDataService.storeRequestStateUpdater
                              );
            if(
                this.state.orderStatus === OrderStatus.ACCEPT ||
                this.state.orderStatus === OrderStatus.ONTHEWAY && this.state.courierId !== this.state.loginUserId ||
                this.state.orderStatus === OrderStatus.DELIVER
            ){
                this.popOverService.showPopUp('Product Already Accepted By Courier');
            }
            else if(form.get('courierId').value === this.state.loginUserId) { //delivered by seller
                form.get('deliveryStatus').patchValue(OrderStatus.ONTHEWAY);
                if(toDeliver === null) {
                    const deliver = await this.endpoint.addToDeliver(form.value, this.storeDataService.storeRequestStateUpdater);
                    this.dataService.deliverForm.get('id').patchValue(deliver.id);
                } else {
                    await this.endpoint.updateToDeliver(form.value, this.storeDataService.storeRequestStateUpdater);
                }
                await this.endpoint.updateOrderStatus(
                    {id: this.state.orderId, orderStatus: OrderStatus.ONTHEWAY},
                    this.storeDataService.storeRequestStateUpdater
                );
                this.setState({
                    ...this.state,
                    orderStatus: OrderStatus.ONTHEWAY,
                    courierId: form.get('courierId').value,
                    isShowBuyerLocationBtn: true,
                    customerName: form.get('customerName').value
                });
             //   this.courMapService.watchCourierPosition(this.state.loginUserId);
                this.popOverService.showPopUp('Updated Product To Be Deliver');
            }
            else if(
                this.state.orderStatus === OrderStatus.NONE ||
                this.state.orderSellerStatus === OrderStatus.DECLINE ||
                this.state.orderStatus === OrderStatus.ONTHEWAY
            ) { //assign order to courier
                if(toDeliver !== null) {
                    form.get('deliveryStatus').patchValue(OrderStatus.PENDING);
                    await this.endpoint.updateToDeliver(form.value, this.storeDataService.storeRequestStateUpdater);
                } else {
                    const deliver = await this.endpoint.addToDeliver(form.value, this.storeDataService.storeRequestStateUpdater);
                    this.dataService.deliverForm.get('id').patchValue(deliver.id);
                }
                await this.endpoint.updateOrderStatus(
                    {id: this.state.orderId, orderStatus: OrderStatus.PENDING},
                    this.storeDataService.storeRequestStateUpdater
                );
                this.setState({
                    ...this.state,
                    orderStatus: OrderStatus.PENDING,
                    isShowBuyerLocationBtn: false
                });
                this.popOverService.showPopUp('Updated Product To Be Deliver');
            }
            else { //change courier
                form.get('deliveryStatus').patchValue(OrderStatus.PENDING);
                await this.endpoint.updateToDeliver(form.value, this.storeDataService.storeRequestStateUpdater);
                this.setState({
                    ...this.state,
                    orderStatus: OrderStatus.PENDING,
                    isShowBuyerLocationBtn: false
                });
                this.popOverService.showPopUp('Updated Product To Be Deliver');
            }
        } catch (error) {
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
                const warningMsgs = this.state.warningMsgs;
                warningMsgs.push('Added Store Rating');
                this.setState({
                    ...this.state,
                    warningMsgs,
                    alreadyAddedStoreRating: true,
                });
            } catch (error) {
                this.popOverService.showPopUp('Something went wrong!!!');
            }
        }
    }
    async canAddRating(): Promise<void>{
        if(this.state.userType === 'Buyer' && this.state.orderStatus === OrderStatus.ORDERDERRECEIVED){
            const rating = await this.endpoint.selectRatingByUserId(
                           {userId: this.state.loginUserId, orderId: this.state.orderId},
                           this.storeDataService.storeRequestStateUpdater
                           );
            if(rating !== null){
                const warningMsgs = this.state.warningMsgs;
                warningMsgs.push('Added Store Rating');
                this.setState({
                    ...this.state,
                    warningMsgs,
                    alreadyAddedStoreRating: true,
                });
            }
        }
    }
    async getToDeliver(): Promise<void>{
        if(this.state.userType === 'Buyer'){
            try {
                const deliver = await this.endpoint.getToDeliver(
                    {orderId: this.state.orderId},
                    this.storeDataService.storeRequestStateUpdater
                );
                this.setState({
                    ...this.state,
                    deliverId: deliver.id
                });
            } catch (error) {}
        }
    }
    async onSetOrderReceivedByBuyer(): Promise<void>{
       try {
           await this.endpoint.updateOrderStatus(
                {id: this.state.orderId, orderStatus: this.dataService.deliverForm.get('deliveryStatus').value},
                this.storeDataService.storeRequestStateUpdater
           );
           await this.endpoint.updateToDeliverStatus(
                {id: this.state.deliverId, status: this.dataService.deliverForm.get('deliveryStatus').value},
                this.storeDataService.storeRequestStateUpdater
           );
           this.popOverService.showPopUp('Updated');
       } catch (error) {
           this.popOverService.showPopUp('Something went wrong!!!');
       }
    }
    async onAddReport(): Promise<void>{
        const modal = await this.modalController.create({
            component: ModalReportComponent,
        });
        await modal.present();
        const rating = await modal.onWillDismiss();
        if(rating.data !== undefined){
           try {
            this.orderDataService.reportForm.get('storeId').patchValue(this.state.storeId);
            this.orderDataService.reportForm.get('orderId').patchValue(this.state.orderId);
            this.orderDataService.reportForm.get('deliverId').patchValue(this.state.deliverId);
            this.orderDataService.reportForm.get('userComment').patchValue(rating.data.comment);
            this.orderDataService.reportForm.get('dateReported').patchValue(formatDate(new Date()));
            this.orderDataService.reportForm.get('userId').patchValue(this.state.loginUserId);
            await this.endpoint.addReport(this.orderDataService.reportForm.value, this.storeDataService.storeRequestStateUpdater);
            const warningMsgs = this.state.warningMsgs;
            warningMsgs.push('Added Report');
            this.popOverService.showPopUp('Added Report');
            this.setState({
                ...this.state,
                alreadyAddedStoreReport: true,
                warningMsgs,
            });
           } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
        }
    }
    async canAddReport(): Promise<void>{
        if(this.state.userType === 'Buyer' && this.state.orderStatus === OrderStatus.ORDERDERRECEIVED){
            const report = await this.endpoint.selectReportByUserId(
                           {userId: this.state.loginUserId, orderId: this.state.orderId},
                           this.storeDataService.storeRequestStateUpdater
                           );
            if(report !== null){
                const warningMsgs = this.state.warningMsgs;
                warningMsgs.push('Added Report');
                this.setState({
                    ...this.state,
                    warningMsgs,
                    alreadyAddedStoreReport: true,
                });
            }
        }
    }
    onLocationClick(): void{
        //this.router.navigateByUrl(`orders/order-location/${this.state.orderId}/${this.state.orderName}/${this.state.orderStatus}/${this.state.orderSellerStatus}/${this.state.storeId}/${this.state.lat}/${this.state.lng}`); //old way
        this.router.navigateByUrl(`orders/order-location/${this.state.orderId}/${this.state.customerName}/${this.state.orderStatus}/${this.state.orderSellerStatus}/${this.state.storeId}/${this.state.customerAddressLat}/${this.state.customerAddressLng}`);
    }
    async getOrderCourierId(): Promise<void>{
        try {
            const deliver = await this.endpoint.getToDeliver(
                {orderId: this.state.orderId},
                this.storeDataService.storeRequestStateUpdater
            );
            this.setState({
                ...this.state,
                courierId: deliver.courier_id
            });
            // if(this.state.courierId !== null){
            //   this.checkIfCourierHaveEnableWatch();
            // }
            if(this.state.courierId === this.state.loginUserId && this.state.userType === UserType.SELLER){
                this.setState({
                    ...this.state,
                    isShowBuyerLocationBtn: true,
                    customerName: deliver.customer_name
                });
            }
        } catch (error) {}
    }
    checkIfCourierHaveEnableWatch(): void{
        const latestcourPosition = this.courMapService.courierPositions.find(postion => postion.courierId === this.state.courierId);
        if(latestcourPosition !== undefined){
           this.setState({
              ...this.state,
              courerHaveEnableWatch: true,
              lat: latestcourPosition.lat,
              lng: latestcourPosition.lng
           });
        }
    }
}
