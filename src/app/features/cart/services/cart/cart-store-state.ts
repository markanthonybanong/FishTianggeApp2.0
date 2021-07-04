import { Cart } from '@fish-tiannge/shared/types';

export class CartStoreState {
    userId: string      = null;
    cartItems: Cart[]   = [];
    total: number       = null;
    paymentType: string = null;
}
