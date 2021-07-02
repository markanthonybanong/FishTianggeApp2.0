import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
import { Product, StoreRequestStateUpdater } from '@fish-tiannge/shared/types';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ARCHIVE_CONFIG } from '../../archive-config';

@Injectable()
export class ArchiveListEndpoint {
    constructor(private apiService: ApiService){}
    getArchieveStoreProducts(store: any, requestStateUpdater: StoreRequestStateUpdater): Promise<Product[]>{
        const request = ARCHIVE_CONFIG.request.getArchiveStoreProducts;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Product[]>(request.path, store)
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
