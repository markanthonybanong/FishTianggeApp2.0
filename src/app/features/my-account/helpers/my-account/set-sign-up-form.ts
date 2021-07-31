import { FormGroup } from '@angular/forms';
import { User } from '@fish-tiannge/shared/types';

export const setSignUpForm = (user: User, form: FormGroup): void =>{
    form.patchValue({
        img: user.img,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        email: user.email,
        phoneNumber: user.phone_number,
        password: user.password,
        confirmPassword: user.password,
        id: user.id
    });
};
