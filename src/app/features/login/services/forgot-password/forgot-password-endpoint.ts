import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { StoreRequestStateUpdater, User } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LOGIN_CONFIG } from '../../login.config';

@Injectable()
export class ForgotPasswordEndpoint {
    constructor(private apiService: ApiService){}
    selectUser(userBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<User[]>{
        const request = LOGIN_CONFIG.request.getByMobileNumOrEmail;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<User[]>(request.path, userBody)
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
    updateUserPassword(userBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<User>{
        const request = LOGIN_CONFIG.request.updateUserPassword;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<User>(request.path, userBody)
        .pipe(
            tap(
                (updatedProduct) => {
                    requestStateUpdater(request.name, {inProgress: false, success: true});
                    return updatedProduct;
                },
                (error: HttpErrorResponse) => {
                    requestStateUpdater(request.name, {inProgress: false, error: true});
                    return throwError(error);
                }
            )
        ).toPromise();
    }

}
