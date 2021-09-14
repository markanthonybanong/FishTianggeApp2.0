import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Deliver, Store, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DELIVERIES_CONFIG } from '../../deliveries.config';

@Injectable()
export class DeliverEndpoint {
    constructor( private apiService: ApiService) {}
    getCourierToDeliverProduct(deliver: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = DELIVERIES_CONFIG.request.getCourierToDeliverProduct;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Deliver>(request.path, deliver)
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
    updateToDeliverStatus(deliver: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = DELIVERIES_CONFIG.request.updateToDeliverStatus;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Deliver>(request.path, deliver)
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
    updateCourierStatus(deliver: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = DELIVERIES_CONFIG.request.updateCourierStatus;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Deliver>(request.path, deliver)
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
    updateOrderSellerStatus(orderBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = DELIVERIES_CONFIG.request.updateOrderSellerStatus;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Deliver>(request.path, orderBody)
            .pipe(
                tap(
                    (order) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return order;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    deleteToDeliver(toDeliverId: string, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = DELIVERIES_CONFIG.request.deleteToDeliver;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.delete<any>(`${request.path}/${toDeliverId}`)
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
    updateOrderStatus(orderBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = DELIVERIES_CONFIG.request.updateOrderStatus;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Deliver>(request.path, orderBody)
            .pipe(
                tap(
                    (order) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return order;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    getStoreById(body: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Store>{
        const request = DELIVERIES_CONFIG.request.getStoreById;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Store>(request.path, body)
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
