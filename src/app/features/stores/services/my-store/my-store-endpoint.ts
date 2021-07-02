import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Store, StoreRequestStateUpdater, User } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { STORES_CONFIG } from '../../stores-config';

@Injectable()
export class MyStoreEndpoint {
    constructor(private apiService: ApiService){}
    addStore(store: Store, requestStateUpdater: StoreRequestStateUpdater): Promise<Store>{
        const request = STORES_CONFIG.request.addStore;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Store>(request.path, store)
            .pipe(
                tap(
                    (createdStore) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return createdStore;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    updateStore(store: Store, requestStateUpdater: StoreRequestStateUpdater): Promise<Store>{
        const request = STORES_CONFIG.request.updateStore;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Store>(request.path, store)
            .pipe(
                tap(
                    (updatedStore) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return updatedStore;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    updateUserStoreId(user: any, requestStateUpdater: StoreRequestStateUpdater): Promise<User> {
        const request = STORES_CONFIG.request.udpateUserStoreId;
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
    getSellerStore(user: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Store>{
        const request = STORES_CONFIG.request.getSellerStore;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Store>(request.path, user)
            .pipe(
                tap(
                    (myStore) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return myStore;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
}
