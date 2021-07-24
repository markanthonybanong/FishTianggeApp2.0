import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Injectable({
    providedIn: 'root',
  })
export class SignUpDataService{
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
        verificationCode: null,
        id: null
    });

    constructor(
        public formBuilder: FormBuilder
    ){}
}
