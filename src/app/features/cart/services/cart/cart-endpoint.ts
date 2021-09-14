import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Cart, Product, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CART_CONFIG } from '../../cart.config';

@Injectable()
export class CartEndpoint {
    constructor(private apiService: ApiService){}
    getUserCartItems(user: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Cart[]>{
        const request = CART_CONFIG.request.getUserCartItems;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Cart[]>(request.path, user)
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
    updateQuantity(cart: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Cart>{
        const request = CART_CONFIG.request.updateQuantity;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Cart>(request.path, cart)
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
    removeCartItem(id: number, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = CART_CONFIG.request.removeCartItem;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.delete<any>(`${request.path}${id}`)
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
    getStoreSameProductsCategory(productBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Product[]>{
        const request = CART_CONFIG.request.getStoreSameProductsCategory;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Product[]>(request.path, productBody)
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
    addToCart(cart: Cart, requestStateUpdater: StoreRequestStateUpdater): Promise<Cart>{
        const request = CART_CONFIG.request.addToCart;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Cart>(request.path, cart)
            .pipe(
                tap(
                    (addedCart) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return addedCart;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
}
