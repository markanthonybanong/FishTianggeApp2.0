import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Rating, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PRODUCTS_CONFIG } from '../../products.config';

@Injectable()
export class RatingListEndpoint {
    constructor(private apiService: ApiService){}
    selectRatingsByStoreId(storeBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Rating[]>{
        const request = PRODUCTS_CONFIG.request.selectRatingsByStoreId;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Rating[]>(request.path, storeBody)
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
