import { Product } from '@fish-tiannge/shared/types';

export class ProductListStoreState {
    requests = {
    };
    products: Product[]       = [];
    searchProducts: Product[] = [];
    userType: string          = null;
    storeId: string           = null;
    storeName: string         = null;
    getStoreProducts          = false;
}
