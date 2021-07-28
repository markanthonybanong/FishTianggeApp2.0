import { Injectable } from '@angular/core';
import { LoginDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { LoginStoreState } from './login-store-state';
import { Store } from 'rxjs-observable-store';
import { Router } from '@angular/router';
import { LoginEndpoint } from './login-endpoint';
import { CourierMapService, PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { AppStore } from 'src/app/app.store';
import { User } from '@fish-tiannge/shared/types';
import { OrderStatus, UserType } from '@fish-tiangge/shared/enums';

@Injectable()
export class LoginStore extends Store<LoginStoreState> {
    constructor(
        private router: Router,
        private dataService: LoginDataService,
        private storeDataService: StoreDataService,
        private endpoint: LoginEndpoint,
        private popOverService: PopOverService,
        private storageService: StorageService,
        private appStore: AppStore,
        private courierMapService: CourierMapService
    ){
        super(new LoginStoreState());
    }
    init(): void{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    }
    onSignUp(): void{
        this.router.navigateByUrl('/sign-up');
    }
    onLogin(): void {
        this.dataService.isLogin = true;
    }
    onBack(): void {
        this.dataService.isLogin = false;
    }
    onSuccesfullLogIn(user: User): void{
        if(user.user_type === 'Seller' || user.user_type === 'Buyer'){
            this.router.navigateByUrl('products');
        } else {
            this.router.navigateByUrl('deliveries');
        }
    }
    async onCredEnter(): Promise<void> {
        try {
            const userBody = {
                email: this.dataService.form.get('email').value,
                password: this.dataService.form.get('password').value
            };
            const user = await this.endpoint.selectUser(userBody, this.storeDataService.storeRequestStateUpdater);
            if(user === null){
                this.popOverService.showPopUp('User Not Found');
            } else {
                await this.storageService.set(
                    'loginUser',
                    {
                        id: user.id,
                        userType: user.user_type,
                        storeId: user.store_id,
                        userName: user.first_name
                    }
                );
                this.setState({
                    ...this.state,
                    loginUserId: user.id
                });
                this.watchCourierPosition(user.user_type);
                this.appStore.init();
                this.onSuccesfullLogIn(user);
            }
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
    async watchCourierPosition(userType: string): Promise<void>{
        if(userType === UserType.COURIER || userType === UserType.SELLER){
            try {
                const deliver = await this.endpoint.getDeliverByCourIdAndStatus(
                    {courId: this.state.loginUserId, status: OrderStatus.ONTHEWAY},
                    this.storeDataService.storeRequestStateUpdater
                );
                if(deliver.length){
                    this.courierMapService.watchCourierPosition(this.state.loginUserId);
                }
            } catch (error) {
            }
        }
    }
    onForgotPassword(): void{
        this.router.navigateByUrl('forgot-password');
    }
}
