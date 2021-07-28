import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@fish-tiangge/shared/services';
import { Store } from 'rxjs-observable-store';
import { AppStoreState } from './app-store-state';
import { LoginUser } from './shared/types';

@Injectable()

export class AppStore extends Store<AppStoreState>{
    constructor(
        private storageService: StorageService,
        private router: Router,
    ){
       super(new AppStoreState());
    }
    async init(): Promise<void> {
       const user: LoginUser = await this.storageService.get('loginUser');
       if(user !== null) {
            let storeLabel: string = null;
            if(user.userType === 'Seller' && user.storeId === null){
                storeLabel = 'Create Store';
            } else {
                storeLabel = 'Update Store';
            }
            this.setState({
                ...this.state,
                userType: user.userType,
                logInUserName: user.userName,
                storeLabel
            });
       }
    }
    onProducts(): void{
        this.router.navigateByUrl('products');
    }
    onOrders(): void{
        this.router.navigateByUrl('orders');
    }
    onStores(): void{
        this.router.navigateByUrl('stores');
    }
    onArchive(): void{
        this.router.navigateByUrl('archive');
    }
    onCart(): void{
        this.router.navigateByUrl('cart');
    }
    onMyAccount(): void{
        this.router.navigateByUrl('my-account');
    }
    onDeliveries(): void{
        this.router.navigateByUrl('deliveries');
    }
    onSukiList(): void{
        this.router.navigateByUrl('suki-list');
    }
    onStoreRating(): void{
        this.router.navigateByUrl('store-rating');
    }
    async onLogOut(): Promise<void> {
        await this.storageService.clear();
        this.router.navigateByUrl('login');
    }
}
