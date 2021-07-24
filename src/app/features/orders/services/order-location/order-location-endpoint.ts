import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Deliver, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ORDER_CONFIG } from '../../order.config';
@Injectable()

export class OrderLocationEndpoint{
    constructor(private apiService: ApiService){}
    getToDeliver(deliverBody: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Deliver>{
        const request = ORDER_CONFIG.request.getToDeliver;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Deliver>(request.path, deliverBody)
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
}
