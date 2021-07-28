import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Rating, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { STORE_RATING_CONFIG } from '../../store-rating.config';

@Injectable()
export class StoreRatingEndpoint {
    constructor(private apiService: ApiService){}
    getRating(ratingBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Rating>{
        const request = STORE_RATING_CONFIG.request.selectRatingById;
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
    deleteRating(ratingId: string, requestStateUpdater: StoreRequestStateUpdater): Promise<any>{
        const request = STORE_RATING_CONFIG.request.deleteRating;
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
