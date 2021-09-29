import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Order, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ORDER_CONFIG } from '../../order.config';

@Injectable()
export class OrderListEndpoint {
    constructor(private apiService: ApiService){}
    getStoreNoneOrders(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order[]>{
        const request = ORDER_CONFIG.request.getStoreNoneOrders;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order[]>(request.path, order)
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
    getStorePendingOrders(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order[]>{
        const request = ORDER_CONFIG.request.getStorePendingOrders;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order[]>(request.path, order)
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
    getStoreAcceptOrders(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order[]>{
        const request = ORDER_CONFIG.request.getStoreAcceptOrders;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order[]>(request.path, order)
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
    getStoreDeclineOrders(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order[]>{
        const request = ORDER_CONFIG.request.getStoreDeclineOrders;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order[]>(request.path, order)
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
    getStoreOnTheWayOrders(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order[]>{
        const request = ORDER_CONFIG.request.getStoreOnTheWayOrders;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order[]>(request.path, order)
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
    getStoreDeliverOrders(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order[]>{
        const request = ORDER_CONFIG.request.getStoreDeliverOrders;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order[]>(request.path, order)
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
    getStoreAllOrders(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order[]>{
        const request = ORDER_CONFIG.request.getStoreAllOrders;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order[]>(request.path, order)
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
    getBuyerPendingOrders(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order[]>{
        const request = ORDER_CONFIG.request.getPendingOrdersByUserId;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order[]>(request.path, order)
            .pipe(
                tap(
                    (orders) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return orders;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
}
