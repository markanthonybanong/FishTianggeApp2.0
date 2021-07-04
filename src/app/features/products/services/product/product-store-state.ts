export class ProductStoreState {
    request = {
        addProduct: {
            inProgress: false
        }
    };
    userType: string      = null;
    sellerBtnName: string = null;
    actionType: string    = null;
    productName: string   = null;
    productId: string     = null;
    disableInput          = false;
}
