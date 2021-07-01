import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';

@Injectable()
export class MyStoreEndpoint {
    constructor(private apiService: ApiService){}

    addStore(store: Store, requestStateUpdater: StoreRequestStateUpdater): Observable<Store>{
        const request = MY_STORE_CONFIG.request.addStore;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<Store>(request.path, store)
            .pipe(
                tap(
                    (store) => {
                        requestStateUpdater(request.name, {inProgress: false, success: true});
                        return store;
                    },
                    (error: HttpErrorResponse) => {
                        requestStateUpdater(request.name, {inProgress: false, error: true});
                        return throwError(error);
                    }
                )
            )
    }
}
