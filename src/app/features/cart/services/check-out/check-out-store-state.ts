import { Cart } from '@fish-tiannge/shared/types';

export class CheckOutStoreState {
    requests = {
        addCartItems: {
            inProgress: false,
        }
    };
    userId: string      = null;
    paymentType: string = null;
    cartItems: Cart[]   = [];
    total: number       = null;
}
