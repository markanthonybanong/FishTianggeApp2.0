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
