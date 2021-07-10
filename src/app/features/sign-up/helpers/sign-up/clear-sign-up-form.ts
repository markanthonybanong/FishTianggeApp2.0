import { FormGroup } from '@angular/forms';

export const clearSignUpForm = (form: FormGroup): void => {
    form.patchValue({
        img: null,
        imgForDisplay: null,
        firstName: null,
        lastName: null,
        userType: null,
        email: null,
        phoneNumber: null,
        address: null,
        password: null,
        confirmPassword: null,
        verificationCode: null,
    });
};
