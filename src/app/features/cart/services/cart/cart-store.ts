import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { setTotals } from '../../helpers/set-totals';
import { CartEndpoint } from './cart-endpoint';
import { CartStoreState } from './cart-store-state';

@Injectable()
export class CartStore extends Store<CartStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private storageService: StorageService,
        private popOverService: PopOverService,
        private endpoint: CartEndpoint,
        private router: Router
    ){
        super(new CartStoreState());
    }

    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            userId: user.id
        });
        this.getUserCartItems();
    }
    async getUserCartItems($event = null): Promise<void> {
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
            if ($event){
                $event.target.complete();
            }
        } catch (error) {
            if ($event){
                $event.target.complete();
            }
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
    onRefresh($event): void{
        this.getUserCartItems($event);
    }
    async onDecrementQuantity(cart: any): Promise<void> {
        if (cart.quantity !== 1){
            cart.quantity -= 1;
            try {
                await this.endpoint.updateQuantity(cart, this.storeDataService.storeRequestStateUpdater);
                this.popOverService.showPopUp('Cart Updated');
                this.getUserCartItems();
            } catch (error) {
                this.popOverService.showPopUp('Something went wrong!!!');
            }
        }
    }
    async onIncrementQuantity(cart: any): Promise<void> {
        cart.quantity += 1;
        try {
            await this.endpoint.updateQuantity(cart, this.storeDataService.storeRequestStateUpdater);
            this.popOverService.showPopUp('Cart Updated');
            this.getUserCartItems();
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
    async onRemoveCartItem(id: number): Promise<void> {
        try {
            await this.endpoint.removeCartItem(id, this.storeDataService.storeRequestStateUpdater);
            this.popOverService.showPopUp('Cart Item Remove');
            this.getUserCartItems();
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
    async onPaymentTypeSelect($event): Promise<void> {
        this.setState({
            ...this.state,
            paymentType: $event.detail.value
        });
    }
    onPlaceOrder(): void{
        this.router.navigateByUrl(`cart/check-out/${this.state.userId}/${this.state.paymentType}`);
    }
}
