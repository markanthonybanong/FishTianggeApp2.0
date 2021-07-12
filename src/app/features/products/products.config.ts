export const PRODUCTS_CONFIG = {
    request: {
        getStoreProducts: {
            name: 'getStoreProducts',
            path: 'product/getStoreProducts'
        },
        getAllStoreProducts: {
            name: 'getAllStoreProducts',
            path: 'product/getAllStoreProducts'
        },
        addProduct: {
            name: 'addProduct',
            path: 'product/addProduct'
        },
        updateProduct: {
            name: 'udpateProduct',
            path: 'product/updateProduct'
        },
        getStoreProduct: {
            name: 'getProduct',
            path: 'product/getProduct'
        },
        addToCart: {
            name: 'addToCart',
            path: 'cart/add'
        },
        updateProductStatus: {
            name: 'updateProductStatus',
            path: 'product/updateProductStatus'
        },
        selectRatingsByStoreId: {
            name: 'selectRatingsByStoreId',
            path: 'rating/selectByStoreId'
        },
        selectRatingById: {
            name: 'selectRatingById',
            path: 'rating/selectById'
        },
        updateRating: {
            name: 'updateRating',
            path: 'rating/update'
        },
        deleteRating: {
            name: 'deleteRating',
            path: 'rating/delete'
        }
    }
};


