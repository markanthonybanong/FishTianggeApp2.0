import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { OrderListStoreState } from './order-list-store-state';

@Injectable()
export class OrderListStore extends Store<OrderListStoreState> {
    constructor(){
        super(new OrderListStoreState());
    }
}
