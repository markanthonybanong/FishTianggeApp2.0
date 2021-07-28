import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { PopOverService } from '@fish-tiangge/shared/services';
import { User } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { ForgotPasswordEndpoint } from './forgot-password-endpoint';
import { ForgotPasswordStoreState } from './forgot-password-store-state';

@Injectable()
export class ForgotPasswordStore extends Store<ForgotPasswordStoreState>{
    constructor(
        private router: Router,
        private endpoint: ForgotPasswordEndpoint,
        private storeDataService: StoreDataService,
        private popOverService: PopOverService
    ){
        super(new ForgotPasswordStoreState());
    }
    init(): void{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.setState({
            ...this.state,
            emailOrPhoneNum: null,
            btnName: 'Verify Email/Phone Number',
            showNewPassword: false,
        });
    }
    onBackBtn(): void{
        this.router.navigateByUrl('login');
    }
    async onSendNewPassword(): Promise<void>{
        try {
            if(this.state.showNewPassword){
                this.endpoint.updateUserPassword(
                    {id: this.state.userId, password: this.state.newPassword},
                    this.storeDataService.storeRequestStateUpdater
                );
                this.popOverService.showPopUp('Updated Password');
            } else {
                const user: User[] = await this.endpoint.selectUser(
                    {email: this.state.emailOrPhoneNum, phoneNum: this.state.emailOrPhoneNum},
                    this.storeDataService.storeRequestStateUpdater
                );
                if(user.length){
                    this.setState({
                        ...this.state,
                        userId: user[0].id,
                        showNewPassword: true,
                        btnName: 'Update Password'
                    });
                } else {
                    this.setState({
                        ...this.state,
                        warningMsg: `${this.state.emailOrPhoneNum} Email/Phone Number Not Found`
                    });
                }
            }
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
}
