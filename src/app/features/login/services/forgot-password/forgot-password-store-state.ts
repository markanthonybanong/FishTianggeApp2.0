export class ForgotPasswordStoreState {
    requests = {
        getByMobileNumOrEmail: {
            inProgress: false
        },
        updateUserPassword: {
            inProgress: false
        },
    };
    emailOrPhoneNum: string = null;
    newPassword: string     = null;
    showNewPassword         = false;
    btnName                 = 'Verify Email/Phone Number';
    warningMsg: string      = null;
    userId: number          = null;
}
