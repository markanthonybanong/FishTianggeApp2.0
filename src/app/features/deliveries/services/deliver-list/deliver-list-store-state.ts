import { Deliver } from '@fish-tiannge/shared/types';

export class DeliverListStoreState {
    userId: string = null;
    deliveries: Deliver[]       = [];
    searchDeliveries: Deliver[] = [];
}
