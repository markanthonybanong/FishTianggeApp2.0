import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PRODUCTS_CONFIG } from '../../products.config';

@Injectable()
export class StoreEndpoint {
    constructor(private apiService: ApiService){}
    addToSukiList(sukiListBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = PRODUCTS_CONFIG.request.addToSukiList;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<any>(request.path, sukiListBody)
            .pipe(
                tap(
                    (sukiList) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return sukiList;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    deleteFromSukiList(sukiListId: string, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = PRODUCTS_CONFIG.request.deleteFromSukiList;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.delete<any>(`${request.path}${sukiListId}`)
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
    sukiListSelectByUserAndStoreId(sukiListBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = PRODUCTS_CONFIG.request.sukiListSelectByUserAndStoreId;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<any>(request.path, sukiListBody)
            .pipe(
                tap(
                    (sukiList) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return sukiList;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }

}
