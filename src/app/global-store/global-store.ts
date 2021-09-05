import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { GlobalStoreState } from './global-store-state';
@Injectable()
export class GlobalStore extends Store<GlobalStoreState> {
    constructor(
    ){
        super(new GlobalStoreState());
    }
    async init(): Promise<void>{
    }
}
