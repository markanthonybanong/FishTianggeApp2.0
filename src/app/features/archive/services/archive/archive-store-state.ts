export class ArchiveStoreState {
    request = {
        updateProductStatus: {
            inProgress: false
        },
        deleteProduct: {
            inProgress: false
        }
    };
    productId: string = null;
    productName: string = null;
}
