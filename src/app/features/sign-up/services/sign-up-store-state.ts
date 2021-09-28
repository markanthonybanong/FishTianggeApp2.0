export class SignUpStoreState {
    requests = {
        signUp: {
            inProgress: false
        },
        getMobileNumAndEmail: {
            inProgress: false
        },
        sendVerificationCode: {
            inProgress: false
        }
    };
    warningMsg: string = null;
    btnName = 'Next';
    haveSendVerificationCode = false;
    verificationCode: number = null;
    password: string = null;
}
