import { Injectable } from '@angular/core';
import { LoginDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { LoginStoreState } from './login-store-state';
import { Store } from 'rxjs-observable-store';
import { Router } from '@angular/router';
import { LoginEndpoint } from './login-endpoint';
import { PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { AppStore } from 'src/app/app.store';
import { User } from '@fish-tiannge/shared/types';

@Injectable()
export class LoginStore extends Store<LoginStoreState> {
    constructor(
        private router: Router,
        private dataService: LoginDataService,
        private storeDataService: StoreDataService,
        private endpoint: LoginEndpoint,
        private popOverService: PopOverService,
       private storageService: StorageService,
       private appStore: AppStore
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
            this.router.navigateByUrl('courier');
        }
    }
    async onCredEnter(): Promise<void> {
        try {
            const userBody = {
                email: this.dataService.form.get('email').value,
                password: this.dataService.form.get('password').value
            };
            const user = await this.endpoint.selectUser(userBody, this.storeDataService.storeRequestStateUpdater);
            await this.storageService.set(
                'loginUser',
                {
                    id: user.id,
                    userType: user.user_type,
                    storeId: user.store_id,
                    userName: user.first_name
                }
            );
            this.appStore.displayLoginUser();
            this.onSuccesfullLogIn(user);
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
}
