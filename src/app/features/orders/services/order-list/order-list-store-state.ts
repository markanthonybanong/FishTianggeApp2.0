import { Order } from '@fish-tiannge/shared/types';

export class OrderListStoreState {
    userType: string             = null;
    userId: string               = null;
    storeId: string              = null;
    pendingOrders: Order[]       = [];
    searchPendingOrders: Order[] = [];
    orderStatus                  = 'None';
}
