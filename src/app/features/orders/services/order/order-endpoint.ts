import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Deliver, Order, Rating, StoreRequestStateUpdater, User } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ORDER_CONFIG } from '../../order.config';

@Injectable()
export class OrderEndpoint {
    constructor(private apiService: ApiService){}
    getOrder(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order>{
        const request = ORDER_CONFIG.request.getOrder;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order>(request.path, order)
            .pipe(
                tap(
                    (orderResult) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return orderResult;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    getToDeliver(deliverBody: any , requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = ORDER_CONFIG.request.getToDeliver;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Deliver>(request.path, deliverBody)
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
    getCouriers(requestStateUpdater: StoreRequestStateUpdater): Promise<User[]>{
        const request = ORDER_CONFIG.request.getCouriers;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<User[]>(request.path, null)
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
    getUser(userBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<User>{
        const request = ORDER_CONFIG.request.getUser;
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
    addToDeliver(deliverBody: any , requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = ORDER_CONFIG.request.addToDeliver;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Deliver>(request.path, deliverBody)
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
    updateToDeliver(deliverBody: Deliver, requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = ORDER_CONFIG.request.updateToDeliver;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Deliver>(request.path, deliverBody)
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
    updateOrderStatus(orderbody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order>{
        const request = ORDER_CONFIG.request.updateOrderStatus;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Order>(request.path, orderbody)
            .pipe(
                tap(
                    (orderResult) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return orderResult;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    addRating(ratingBody: any , requestStateUpdater: StoreRequestStateUpdater): Promise<Rating>{
        const request = ORDER_CONFIG.request.addRating;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Rating>(request.path, ratingBody)
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
    selectRatingByUserId(ratingBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Rating>{
        const request = ORDER_CONFIG.request.selectRatingByUserAndOrderId;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Rating>(request.path, ratingBody)
            .pipe(
                tap(
                    (rating) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return rating;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    updateToDeliverStatus(deliverBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = ORDER_CONFIG.request.updateToDeliverStatus;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Deliver>(request.path, deliverBody)
            .pipe(
                tap(
                    (orderResult) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return orderResult;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    addReport(reportBody: any , requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = ORDER_CONFIG.request.addReport;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<any>(request.path, reportBody)
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
    selectReportByUserId(reportBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = ORDER_CONFIG.request.selectReportByUserAndOrderId;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<any>(request.path, reportBody)
            .pipe(
                tap(
                    (report) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return report;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
}
