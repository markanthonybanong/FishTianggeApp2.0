import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Rating, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PRODUCTS_CONFIG } from '../../products.config';

@Injectable()
export class RatingEndpoint {
    constructor(private apiService: ApiService){}
    getRating(ratingBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Rating>{
        const request = PRODUCTS_CONFIG.request.selectRatingById;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Rating>(request.path, ratingBody)
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
    updateRating(ratingBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Rating>{
        const request = PRODUCTS_CONFIG.request.updateRating;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<Rating>(request.path, ratingBody)
            .pipe(
                tap(
                    (updatedRating) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return updatedRating;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
    deleteRating(ratingId: string, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = PRODUCTS_CONFIG.request.deleteRating;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.delete<any>(`${request.path}/${ratingId}`)
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
