import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Store, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import {  throwError } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { STORES_CONFIG } from '../../stores-config';

@Injectable()
export class StoreListEndpoint {
    constructor(private apiService: ApiService){}
    getStores(requestStateUpdater: StoreRequestStateUpdater): Promise<Store[]>{
        const request = STORES_CONFIG.request.getStores;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Store[]>(request.path, null)
            .pipe(
                tap(
                    (stores) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return stores;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            ).toPromise();
    }
}
