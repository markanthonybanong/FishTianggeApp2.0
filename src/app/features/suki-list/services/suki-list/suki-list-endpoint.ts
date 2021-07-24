import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SUKI_LIST_CONFIG } from '../../suki-list.config';

@Injectable()
export class SukiListEndpoint {
    constructor(private apiService: ApiService){}
    getSukilist(sukiListBody, requestStateUpdater: StoreRequestStateUpdater): Promise<any[]>{
        const request = SUKI_LIST_CONFIG.request.getSukiList;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<any[]>(request.path, sukiListBody)
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
