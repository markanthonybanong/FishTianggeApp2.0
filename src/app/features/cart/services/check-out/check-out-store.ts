/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { OrderStatus } from '@fish-tiangge/shared/enums';
import { formatDate, getStoreRequestStateUpdater, validPhoneNumber } from '@fish-tiangge/shared/helpers';
import { PopOverService } from '@fish-tiangge/shared/services';
import { Order } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { setTotals } from '../../helpers/set-totals';
import { CheckOutEndpoint } from './check-out-endpoint';
import { CheckOutStoreState } from './check-out-store-state';

@Injectable()
export class CheckOutStore extends Store<CheckOutStoreState>{
    constructor(
        private storeDataService: StoreDataService,
        private router: Router,
        private dataService: CheckoutDataService,
        private endpoint: CheckOutEndpoint,
        private popOverService: PopOverService
    ){
        super(new CheckOutStoreState());
    }
    init(): void{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.getUser();
        this.getCartItems();
    }
    onBack(): void{
        this.router.navigateByUrl('cart');
    }
    async getUser(): Promise<void> {
        try {
            const user = await this.endpoint.getUser({userId: this.state.userId}, this.storeDataService.storeRequestStateUpdater);
            if(this.state.paymentType === 'COD'){
                this.dataService.form.patchValue({
                    customerName: `${user.first_name} ${user.last_name}`,
                    dateOrder: formatDate(new Date()),
                    mobilePhone: user.phone_number,
                    address: user.address,
                    addressLat: user.address_lat,
                    addressLng: user.address_lng
                });
            }
        } catch (error) {
        }
    }
    async getCartItems(): Promise<void>{
        try {
            const cartItems = await this.endpoint.getUserCartItems(
                                    {userId: this.state.userId},
                                    this.storeDataService.storeRequestStateUpdater
                             );
            this.setState({
                ...this.state,
                cartItems,
                total: setTotals(cartItems)
            });
        } catch (error) {
        }
    }
    async onFormSubmit(form: FormGroup): Promise<void>{
        if(!validPhoneNumber(form.get('mobilePhone').value)){
            this.popOverService.showPopUp('Invalid Phone Number');
        } else {
            let errorWHenAddingOrder = false;
            const cartItems          = this.state.cartItems;
            for(const item of cartItems){
                try {
                    const order: Order = {
                        ...item,
                        customer_name: form.get('customerName').value,
                        order_date: form.get('dateOrder').value,
                        order_note: form.get('orderNote').value,
                        customer_mobile_num: form.get('mobilePhone').value,
                        customer_address: form.get('address').value,
                        customer_address_lat: form.get('addressLat').value,
                        customer_address_lng: form.get('addressLng').value,
                        status: OrderStatus.NONE,
                        seller_status: OrderStatus.NONE,
                    };
                    await this.endpoint.addOrder(order, this.storeDataService.storeRequestStateUpdater);
                } catch (error) {
                    errorWHenAddingOrder = true;
                }
                if(errorWHenAddingOrder){
                    break;
                }
            }
            if(errorWHenAddingOrder){
                this.popOverService.showPopUp('Something went wrong!!!');
            } else {
                try {
                    await this.endpoint.removeCartItems(this.state.userId, this.storeDataService.storeRequestStateUpdater);
                    this.setState({
                        ...this.state,
                        total: 0,
                        cartItems: []
                    });
                    this.popOverService.showPopUp('Successfully Place Order');
                } catch (error) {
                }
            }
        }
    }

}
