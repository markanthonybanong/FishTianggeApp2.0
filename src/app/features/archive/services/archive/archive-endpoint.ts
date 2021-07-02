import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Product, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ARCHIVE_CONFIG } from '../../archive-config';

@Injectable()
export class ArchiveEndpoint {
    constructor(private apiService: ApiService){}
    getProduct(product: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Product>{
        const request = ARCHIVE_CONFIG.request.getProduct;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Product>(request.path, product)
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
    updateProductStatus(product: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Product>{
        const request = ARCHIVE_CONFIG.request.updateProductStatus;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Product>(request.path, product)
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
    deleteProduct(productId: string, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = ARCHIVE_CONFIG.request.deleteProduct;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.delete<any>(`${request.path}${productId}`)
            .pipe(
                tap(
                    (msg) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return msg;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }

}
