/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { OrderStatus } from '@fish-tiangge/shared/enums';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
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
                    dateOrder: this.formatDate(new Date()),
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
        let errorWHenAddingOrder = false;
        const cartItems          = this.state.cartItems;
        for(const item of cartItems){
            try {
                const order: Order = {
                    ...item,
                    customer_name: form.value.customerName,
                    order_date: form.value.dateOrder,
                    order_note: form.value.orderNote,
                    customer_mobile_num: form.value.mobilePhone,
                    customer_address: form.value.address,
                    status: OrderStatus.NONE
                };
                await this.endpoint.addOrder(order, this.storeDataService.storeRequestStateUpdater);
            } catch (error) {
                console.log('error ', error);
                
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
                    cartItems: []
                });
                this.popOverService.showPopUp('Successfulyy Place Order');
            } catch (error) {
            }
        }
    }
    private formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

}
