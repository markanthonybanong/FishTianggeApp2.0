export class LoginStoreState {
    requests = {
        login: { inProgress: false}
    };
    warningMsg: string = null;
    loginUserId: number = null;
}
