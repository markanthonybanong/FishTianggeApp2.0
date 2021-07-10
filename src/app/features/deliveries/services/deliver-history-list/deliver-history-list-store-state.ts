import { Deliver } from '@fish-tiannge/shared/types';

export class DeliverHistoryListStoreState {
    userId: string = null;
    deliveries: Deliver[]       = [];
    searchDeliveries: Deliver[] = [];
}
