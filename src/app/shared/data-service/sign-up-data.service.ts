import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserType } from '../enums';

@Injectable({
    providedIn: 'root',
  })
export class SignUpDataService{
    public verificationCode: number = null;
    public isAlreadySendVerificationCode: boolean = false;
    public isShowVerificationCode = false;
    public btnName = 'Next';
    public signUpForm = this.formBuilder.group({
        img: null,
        imgForDisplay: null,
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        userType: [null, Validators.required],
        email: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: null,
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
        verificationCode: null
    });
    
    constructor(
        public formBuilder: FormBuilder
    ){
     
    }
 
}