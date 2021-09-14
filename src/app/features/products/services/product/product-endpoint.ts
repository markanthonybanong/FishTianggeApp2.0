import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Cart, Product, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PRODUCTS_CONFIG } from '../../products.config';

@Injectable()
export class ProductEndpoint {
    constructor(private apiService: ApiService){}
    addProduct(product: Product, requestStateUpdater: StoreRequestStateUpdater): Promise<Product> {
        const request = PRODUCTS_CONFIG.request.addProduct;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Product>(request.path, product)
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
    updateProduct(product: Product, requestStateUpdater: StoreRequestStateUpdater): Promise<Product>{
        const request = PRODUCTS_CONFIG.request.updateProduct;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Product>(request.path, product)
            .pipe(
                tap(
                    (updatedProduct) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return updatedProduct;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    getStoreProduct(store: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Product>{
        const request = PRODUCTS_CONFIG.request.getStoreProduct;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Product>(request.path, store)
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
    addToCart(cart: Cart, requestStateUpdater: StoreRequestStateUpdater): Promise<Cart>{
        const request = PRODUCTS_CONFIG.request.addToCart;
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
    updateProductStatus(product: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Product>{
        const request = PRODUCTS_CONFIG.request.updateProductStatus;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Product>(request.path, product)
        .pipe(
            tap(
                (updatedProduct) => {
                    requestStateUpdater(request.name, {inProgress: false, success: true});
                    return updatedProduct;
                },
                (error: HttpErrorResponse) => {
                    requestStateUpdater(request.name, {inProgress: false, error: true});
                    return throwError(error);
                }
            )
        ).toPromise();
    }
}
