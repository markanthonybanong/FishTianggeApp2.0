/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { ImageService, PopOverService } from '@fish-tiangge/shared/services';
import { User } from '@fish-tiannge/shared/types';
import { ActionSheetController } from '@ionic/angular';
import { Store } from 'rxjs-observable-store';
import { tap } from 'rxjs/operators';
import { clearSignUpForm } from '../helpers/sign-up/clear-sign-up-form';
import { findEmail } from '../helpers/sign-up/find-email';
import { findPhoneNumber } from '../helpers/sign-up/find-phone-number';
import { isPasswordMatch } from '../helpers/sign-up/is-password-match';
import { SignUpEndpoint } from './sign-up-endpoint';
import { SignUpStoreState } from './sign-up-store-state';

@Injectable()
export class SignUpStore extends Store<SignUpStoreState> {
    constructor(
        private router: Router,
        private dataService: SignUpDataService,
        public actionSheetController: ActionSheetController,
        private imageService: ImageService,
        private popOverService: PopOverService,
        private endpoint: SignUpEndpoint,
        private storeDataService: StoreDataService

    ){
        super(new SignUpStoreState());
    }
    init(): void {
        clearSignUpForm(this.dataService.signUpForm);
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
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
          this.storeDataService.warningMsg = 'Email and Phone number already exist';
        } else if (isPhoneNumFound) {
          this.storeDataService.warningMsg = 'Phone number already exist';
        } else {
          this.storeDataService.warningMsg = 'Email already exist';
        }
     }
     sendVerificationCode(phoneNum: number): void {
        this.endpoint.sendVerificationCode({phoneNum: phoneNum}, this.storeDataService.storeRequestStateUpdater)
         .pipe(
            tap(
              (code) => {
                this.dataService.isAlreadySendVerificationCode = true;
                this.dataService.verificationCode              = code;
              }, (err) => {
              }
            )
         ).subscribe();
     }
     isMatchVerificationCode(verificationCode: number): boolean {
        let isMatch = false;
        if(verificationCode == this.dataService.verificationCode) {
          isMatch = true;
        } else {
          this.storeDataService.warningMsg = 'Invalid verification code';
        }
        return isMatch;
     }
     registerUser(signUp: User) {
        this.endpoint.signUp(signUp, this.storeDataService.storeRequestStateUpdater)
        .pipe(
          tap(
            (user) => {
              this.popOverService.showPopUp(`Succesfully added ${user.first_name} ${user.last_name}`);
              clearSignUpForm(this.dataService.signUpForm);
            },
            (error) => {
              this.popOverService.showPopUp('Something went wrong!!!');
            }
          )
        ).subscribe();
    }
    async onSignUp(form: FormGroup): Promise<void> {
        const signUp: User = form.value;
          if(isPasswordMatch(signUp.password, signUp.confirmPassword)){
            const email    = signUp.email;
            const phoneNum = form.get('phoneNumber').value;
            const users    = await this.endpoint.getMobileNumAndEmail(
                                { email: email, phoneNum: phoneNum },
                                this.storeDataService.storeRequestStateUpdater
                            );
            users.pipe(
              tap(
                (users) => {
                   if(users.length) {
                      this.displayEmailAndPhoneWarningMsg(users, email, phoneNum);
                   } else {
                      if(this.dataService.isAlreadySendVerificationCode === false) {
                        this.dataService.btnName                = 'Sign Up';
                        this.dataService.isShowVerificationCode = true;
                        this.storeDataService.warningMsg        = 'We have sent a verication code to your phone number';
                        this.sendVerificationCode(phoneNum);
                      } else {
                        const verificationCode: number = form.get('verificationCode').value;
                        if(this.isMatchVerificationCode(verificationCode)) {
                           this.registerUser(signUp);
                        }
                      }
                   }
                },
                (error) => {}
              )
            ).subscribe();
          } else {
            this.storeDataService.warningMsg = 'Password doesn\'t match';
          }
      }
}
