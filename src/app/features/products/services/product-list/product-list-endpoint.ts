import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Product, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs/internal/observable/throwError';
import { tap } from 'rxjs/operators';
import { PRODUCTS_CONFIG } from '../../products.config';

@Injectable()
export class ProductListEndpoint {
    constructor(private apiService: ApiService){}
    getStoreProducts(storeId: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Product[]>{
        const request = PRODUCTS_CONFIG.request.getStoreProducts;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Product[]>(request.path, storeId)
            .pipe(
                tap(
                    (products) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return products;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    getStoreProductsForBuyer(storeId: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Product[]>{
        const request = PRODUCTS_CONFIG.request.getStoreProductsForBuyer;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Product[]>(request.path, storeId)
            .pipe(
                tap(
                    (products) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return products;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    getAllStoreProducts(requestStateUpdater: StoreRequestStateUpdater): Promise<Product[]>{
        const request = PRODUCTS_CONFIG.request.getAllStoreProducts;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Product[]>(request.path, null)
            .pipe(
                tap(
                    (products) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return products;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
}
