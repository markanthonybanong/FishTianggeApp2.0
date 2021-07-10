/* eslint-disable @typescript-eslint/no-shadow */
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { StoreRequestStateUpdater, User } from '@fish-tiannge/shared/types';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SIGN_UP_CONFIG } from '../sign-up.config';

@Injectable()
export class SignUpEndpoint {
    constructor(private apiService: ApiService) {}
    signUp(user: User, requestStateUpdater: StoreRequestStateUpdater): Promise<User>{
        const request = SIGN_UP_CONFIG.request.signUp;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<User>(request.path, user)
            .pipe(
                tap(
                    (user) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return user;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    getMobileNumAndEmail(user: any, requestStateUpdater: StoreRequestStateUpdater): Promise<User[]>{
        const request = SIGN_UP_CONFIG.request.getMobileNumAndEmail;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Array<User>>(request.path, user)
            .pipe(
                tap(
                    (user) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return user;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    sendVerificationCode(email: any, requestStateUpdater: StoreRequestStateUpdater): Promise<number>{
        const request = SIGN_UP_CONFIG.request.sendVerificationCode;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<number>(request.path, email)
            .pipe(
                tap(
                    (user) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return user;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
}
