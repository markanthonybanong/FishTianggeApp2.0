import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Cart, Order, StoreRequestStateUpdater, User } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs/internal/observable/throwError';
import { tap } from 'rxjs/internal/operators/tap';
import { CART_CONFIG } from '../../cart.config';

@Injectable()
export class CheckOutEndpoint {
    constructor(private apiService: ApiService){}
    getUser(user: any, requestStateUpdater: StoreRequestStateUpdater): Promise<User>{
        const request = CART_CONFIG.request.getUser;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<User>(request.path, user)
            .pipe(
                tap(
                    (cartItems) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return cartItems;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    getUserCartItems(user: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Cart[]>{
        const request = CART_CONFIG.request.getUserCartItems;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Array<Cart>>(request.path, user)
            .pipe(
                tap(
                    (cartItems) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return cartItems;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    addOrder(order: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Order> {
        const request = CART_CONFIG.request.addCartItems;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Order>(request.path, order)
            .pipe(
                tap(
                    (product) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return product;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    removeCartItems(userId: string, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = CART_CONFIG.request.removeCartItems;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.delete<any>(`${request.path}${userId}`)
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
