import { UserMeta } from "@fish-tiannge/shared/types";

export class ProductStoreState {
    requests = {
        addProduct: {
            inProgress: false
        },
        udpateProduct: {
            inProgress: false
        },
        updateProductStatus: {
            inProgress: false
        },
        addToCart: {
            inProgress: false
        }
    };
    userType: string      = null;
    sellerBtnName: string = null;
    actionType: string    = null;
    productName: string   = null;
    productId: string     = null;
    disableInput          = false;
    storeId: string       = null;
    storeName: string     = null;
    isShowHeader          = false;
    loginUserId: string   = null;
    categories: string[]  = [];
}
