import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Product, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
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
}
