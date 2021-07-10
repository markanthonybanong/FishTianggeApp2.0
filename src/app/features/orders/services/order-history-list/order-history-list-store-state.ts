import { Order } from '@fish-tiannge/shared/types';

export class OrderHistoryListStoreState {
    userType: string               = null;
    userId: string                 = null;
    storeId: string                = null;
    deliveredOrders: Order[]       = [];
    searchDeliveredOrders: Order[] = [];
}
