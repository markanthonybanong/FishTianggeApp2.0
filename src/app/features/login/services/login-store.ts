import { Injectable } from '@angular/core';
import { LoginDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { LoginStoreState } from './login-store-state';
import { Store } from 'rxjs-observable-store';
import { Router } from '@angular/router';
import { LoginEndpoint } from './login-endpoint';
import { PopOverService, StorageService } from 'src/app/shared/services';
import { AppStore } from 'src/app/app.store';
import { tap } from 'rxjs/operators';

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

    }
    onLogin(): void {
        this.dataService.isLogin = true;
    }
    onBack(): void {
        this.dataService.isLogin = false;
    }
    async onCredEnter(): Promise<void> {
        const userBody = {
            email: this.dataService.form.get('email').value,
            password: this.dataService.form.get('password').value
        };
        this.endpoint.selectUser(userBody, this.storeDataService.storeRequestStateUpdater)
         .pipe(
            tap(
              (user) => {
                const loginUser: any = {
                    id: user.id,
                    userType: user.user_type,
                    storeId: user.store_id,
                    userName: user.first_name
                };
                this.storageService.setLoginUser(loginUser).then( () => {
                    if(user.user_type === 'Seller') {
                        this.router.navigateByUrl('/products');
                    }else if(user.user_type === 'Buyer') {
                        this.router.navigateByUrl('/browse-stores');
                    } else {
                        this.router.navigateByUrl('/deliver');
                    }
                });
              },
              (error) => {
                this.popOverService.showPopUp('Something went wrong!!!');
              }
            )
         ).subscribe();
    }
}
