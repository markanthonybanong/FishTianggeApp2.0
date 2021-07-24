import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { StoreRequestStateUpdater, User } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs/internal/observable/throwError';
import { tap } from 'rxjs/internal/operators/tap';
import { MY_ACCOUNT_CONFIG } from '../../my-account.config';

@Injectable()
export class MyAccountEndpoint {
    constructor( private apiService: ApiService) {}
    getUser(userBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<User>{
        const request = MY_ACCOUNT_CONFIG.request.getUser;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<User>(request.path, userBody)
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
    updateUser(user: any, requestStateUpdater: StoreRequestStateUpdater): Promise<User>{
        const request = MY_ACCOUNT_CONFIG.request.updateUser;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<User>(request.path, user)
            .pipe(
                tap(
                    (updatedUser) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return updatedUser;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
}
