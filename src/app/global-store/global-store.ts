import { Injectable } from '@angular/core';
import { CourierMapService } from '@fish-tiangge/shared/services';
import { Store } from 'rxjs-observable-store';
import { GlobalStoreState } from './global-store-state';
@Injectable()
export class GlobalStore extends Store<GlobalStoreState> {
    constructor(
        private courMapService: CourierMapService
    ){
        super(new GlobalStoreState());
    }
    async init(): Promise<void>{
    }
}