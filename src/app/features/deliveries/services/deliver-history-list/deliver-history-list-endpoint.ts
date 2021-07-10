import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Deliver, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DELIVERIES_CONFIG } from '../../deliveries.config';

@Injectable()
export class DeliverHistoryListEndpoint {
    constructor( private apiService: ApiService) {}
    getCourierDeliveredDeliveries(deliver: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver[]>{
        const request = DELIVERIES_CONFIG.request.getCourierDeliveredDeliveries;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Deliver[]>(request.path, deliver)
            .pipe(
                tap(
                    (deliveries) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return deliveries;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
}
