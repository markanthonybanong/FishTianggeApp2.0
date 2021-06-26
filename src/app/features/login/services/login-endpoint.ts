import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { StoreRequestStateUpdater, User } from '@fish-tiannge/shared/types';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LOGIN_CONFIG } from '../login.config';
@Injectable()
export class LoginEndpoint {
    constructor(
        private apiService: ApiService
    ){
    }

    selectUser(user: any, requestStateUpdater: StoreRequestStateUpdater): Observable<User>{
        const request = LOGIN_CONFIG.request.login;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<User>(request.path, user)
            .pipe(
                tap(
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    (user) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return user;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            );
    }

}
