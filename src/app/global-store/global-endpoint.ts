import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { StoreRequestStateUpdater, UserMeta } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APP_CONFIG } from '../app.config';

@Injectable()
export class GlobalEndpoint {
    constructor(private apiService: ApiService){}
    addUserMeta(userMetaBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<UserMeta> {
        const request = APP_CONFIG.request.addUserMeta;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<UserMeta>(request.path, userMetaBody)
            .pipe(
                tap(
                    (addedProduct) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return addedProduct;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    selectUserMetaById(userMetaBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<UserMeta> {
        const request = APP_CONFIG.request.userMetaSelectById;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<UserMeta>(request.path, userMetaBody)
            .pipe(
                tap(
                    (addedProduct) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return addedProduct;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    selectUserMetaByUserIdAndMetaKey(userMetaBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<UserMeta[]> {
        const request = APP_CONFIG.request.userMetaSelectByUserIdAndMetaKey;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<UserMeta[]>(request.path, userMetaBody)
            .pipe(
                tap(
                    (addedProduct) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return addedProduct;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    updateUserMeta(updateUserMetaBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<UserMeta>{
        const request = APP_CONFIG.request.updateUserMeta;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<UserMeta>(request.path, updateUserMetaBody)
            .pipe(
                tap(
                    (updatedRating) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return updatedRating;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    deleteUserMeta(userMetaId: string, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = APP_CONFIG.request.deleteUserMeta;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.delete<any>(`${request.path}${userMetaId}`)
            .pipe(
                tap(
                    (mess) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return mess;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }

}
