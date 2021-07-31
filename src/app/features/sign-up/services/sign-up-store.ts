/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater, validEmail, validPhoneNumber } from '@fish-tiangge/shared/helpers';
import { GeolocationService, ImageService, PopOverService } from '@fish-tiangge/shared/services';
import { User } from '@fish-tiannge/shared/types';
import { ActionSheetController } from '@ionic/angular';
import { Store } from 'rxjs-observable-store';
import { clearSignUpForm } from '../helpers/sign-up/clear-sign-up-form';
import { findEmail } from '../helpers/sign-up/find-email';
import { findPhoneNumber } from '../helpers/sign-up/find-phone-number';
import { SignUpEndpoint } from './sign-up-endpoint';
import { SignUpStoreState } from './sign-up-store-state';
import { Geolocation } from '@capacitor/geolocation';

@Injectable()
export class SignUpStore extends Store<SignUpStoreState> {
    constructor(
        private router: Router,
        private dataService: SignUpDataService,
        public actionSheetController: ActionSheetController,
        private imageService: ImageService,
        private popOverService: PopOverService,
        private endpoint: SignUpEndpoint,
        private storeDataService: StoreDataService,
        private geolocationService: GeolocationService

    ){
        super(new SignUpStoreState());
    }
    init(): void {
        clearSignUpForm(this.dataService.signUpForm);
        this.setState({
          ...this.state,
          warningMsg: null
        });
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.setAddress();
    }
    onBackBtn(): void{
        this.router.navigateByUrl('login');
    }
    async onUploadImg(): Promise<void> {
        const imgFormControl           = this.dataService.signUpForm.get('img') as FormControl;
        const imgForDisplayFormControl = this.dataService.signUpForm.get('imgForDisplay') as FormControl;
        const actionSheet = await this.actionSheetController.create({
          header: 'Select Image source',
          buttons: [
            {
              text: 'Load from Library',
              handler: () => {
                this.imageService.loadFromLibrary()
                  .then( base64 => {
                    imgFormControl.setValue(base64);
                    imgForDisplayFormControl.setValue(this.imageService.safePhotoURL(base64));
                  }).catch (err => {});
              }
            },
            {
              text: 'Use Camera',
              handler: () => {
                this.imageService.takePicture()
                  .then( base64=> {
                    imgFormControl.setValue( base64);
                    imgForDisplayFormControl.setValue(this.imageService.safePhotoURL(base64));
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
    displayEmailAndPhoneWarningMsg(users: Array<User>, email: string, phoneNum: any): void {
        const isEmailFound    = findEmail(users, email);
        const isPhoneNumFound = findPhoneNumber(users, phoneNum);
        if(isEmailFound && isPhoneNumFound) {
          this.setState({
            ...this.state,
            warningMsg: 'Email and Phone number already exist'
          });
        } else if (isPhoneNumFound) {
          this.setState({
            ...this.state,
            warningMsg: 'Phone number already exist'
          });
        } else {
          this.setState({
            ...this.state,
            warningMsg: 'Email already exist',
          });
        }
     }
    async onSignUp(form: FormGroup): Promise<void> {
          if(form.get('password').value !== form.get('confirmPassword').value){
            this.setState({
              ...this.state,
              warningMsg: 'Password doesn\'t match',
            });
          }else if(!validPhoneNumber(form.get('phoneNumber').value)) {
            this.setState({
              ...this.state,
              warningMsg: 'Invalid Phone Number'
            });
          } else if(!validEmail(form.get('email').value)){
            this.setState({
              ...this.state,
              warningMsg: 'Invalid Email'
            });
          }else {
              try {
                const email    = form.get('email').value;
                const phoneNum = form.get('phoneNumber').value;
                const users    = await this.endpoint.getMobileNumAndEmail(
                                  { email, phoneNum},
                                  this.storeDataService.storeRequestStateUpdater
                                );
                if(users.length){
                  this.displayEmailAndPhoneWarningMsg(users, email, phoneNum);
                } else if(this.state.haveSendVerificationCode === false) {
                  this.setState({
                    ...this.state,
                    warningMsg: 'Sending Verification Code'
                  });
                  const verificationCode = await this.endpoint.sendVerificationCode(
                                            {email},
                                            this.storeDataService.storeRequestStateUpdater
                                          );
                  this.setState({
                    ...this.state,
                    warningMsg: 'We have send a verification code to your email, If not found in your inbox, Check your spam.',
                    btnName: 'Sign Up',
                    haveSendVerificationCode: true,
                    verificationCode,
                  });
                } else if(form.get('verificationCode').value != this.state.verificationCode){
                  this.setState({
                    ...this.state,
                    warningMsg: 'Invalid Verification Code'
                  });
                } else {
                  const user: any = await this.endpoint.signUp(form.value, this.storeDataService.storeRequestStateUpdater);
                  this.popOverService.showPopUp(`Succesfully Added ${user.first_name} ${user.last_name}`);
                  clearSignUpForm(this.dataService.signUpForm);
                }

              } catch (error) {
                this.popOverService.showPopUp('Something Went Wrong!!!');
              }
          }
    }
    async setAddress(): Promise<void>{
       const currentAddress = await this.geolocationService.currentAddress();
       this.dataService.signUpForm.get('address').patchValue(currentAddress.address);
       this.dataService.signUpForm.get('addressLat').patchValue(currentAddress.lat);
       this.dataService.signUpForm.get('addressLng').patchValue(currentAddress.lng);
    }
}
