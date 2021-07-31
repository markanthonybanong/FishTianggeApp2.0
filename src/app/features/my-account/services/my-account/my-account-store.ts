import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SignUpDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater, validEmail, validPhoneNumber } from '@fish-tiangge/shared/helpers';
import { GeolocationService, ImageService, PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser, User } from '@fish-tiannge/shared/types';
import { ActionSheetController } from '@ionic/angular';
import { Store } from 'rxjs-observable-store';
import { setSignUpForm } from '../../helpers/my-account/set-sign-up-form';
import { MyAccountEndpoint } from './my-account-endpoint';
import { MyAccountStoreState } from './my-account-store-state';

@Injectable()
export class MyAccountStore extends Store<MyAccountStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private storageService: StorageService,
        private endpoint: MyAccountEndpoint,
        private signUpDataService: SignUpDataService,
        private imageService: ImageService,
        private actionSheetController: ActionSheetController,
        private popOverService: PopOverService,
        private geolocationService: GeolocationService
    ){
        super(new MyAccountStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            loginUserId: user.id
        });
        this.getUser();
    }
    async getUser(): Promise<void>{
        try {
            const user: User = await this.endpoint.getUser(
                                        {userId: this.state.loginUserId},
                                        this.storeDataService.storeRequestStateUpdater
                                );
            const currentAddress = await this.geolocationService.currentAddress();
            this.signUpDataService.signUpForm.get('address').patchValue(currentAddress.address);
            this.signUpDataService.signUpForm.get('addressLat').patchValue(currentAddress.lat);
            this.signUpDataService.signUpForm.get('addressLng').patchValue(currentAddress.lng);
            setSignUpForm(user, this.signUpDataService.signUpForm);
        } catch (error) {
        }
    }
    async onUploadImg(): Promise<void> {
        const imgFormControl = this.signUpDataService.signUpForm.get('img') as FormControl;
        const actionSheet = await this.actionSheetController.create({
          header: 'Select Image source',
          buttons: [
            {
              text: 'Load from Library',
              handler: () => {
                this.imageService.loadFromLibrary()
                  .then( base64 => {
                    imgFormControl.setValue(base64);
                  }).catch (err => {});
              }
            },
            {
              text: 'Use Camera',
              handler: () => {
                this.imageService.takePicture()
                  .then( base64=> {
                    imgFormControl.setValue(base64);
                  }).catch( err => {});
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
          }]
       });
       await actionSheet.present();
    }
    async onUpdate(): Promise<void>{
        if(!validPhoneNumber(this.signUpDataService.signUpForm.get('phoneNumber').value)) {
            this.setState({
              ...this.state,
              warningMsg: 'Invalid Phone Number'
            });
          } else if(!validEmail(this.signUpDataService.signUpForm.get('email').value)){
            this.setState({
              ...this.state,
              warningMsg: 'Invalid Email'
            });
          } else {
            try {
                await this.endpoint.updateUser(
                    this.signUpDataService.signUpForm.value,
                    this.storeDataService.storeRequestStateUpdater
                );
                this.setState({
                    ...this.state,
                    warningMsg: null
                });
                this.popOverService.showPopUp('Updated Account');
            } catch (error) {
                this.popOverService.showPopUp('Something went wrong!!!');
            }
          }
    }
}
