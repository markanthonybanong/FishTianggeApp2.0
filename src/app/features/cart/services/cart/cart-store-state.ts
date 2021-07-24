import { Cart, Product } from '@fish-tiannge/shared/types';

export class CartStoreState {
    userId: string             = null;
    cartItems: Cart[]          = [];
    total: number              = null;
    paymentType: string        = null;
    relatedProducts: Product[] = [];
}
