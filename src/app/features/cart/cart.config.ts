export const CART_CONFIG = {
    request: {
        getUserCartItems: {
            name: 'getUserCartItems',
            path: 'cart/getUserCartItems'
        },
        updateQuantity: {
            name: 'updateQuantity',
            path: 'cart/updateQuantity'
        },
        removeCartItem: {
            name: 'removeCartItem',
            path: 'cart/removeCartItem/'
        },
        removeCartItems: {
            name: 'removeCartItems',
            path: 'cart/removeCartItems/'
        },
        getUser: {
            name: 'getuser',
            path: 'user/getUser'
        },
        addCartItems: {
            name: 'addCartItems',
            path: 'order/addOrder'
        },
        getStoreSameProductsCategory:{
            name: 'getStoreSameProductsCategory',
            path: 'product/getStoreSameProductsCategory'
        },
        addToCart: {
            name: 'addToCart',
            path: 'cart/add'
        },
        getStoreProduct: {
            name: 'getProduct',
            path: 'product/getProduct'
        },
        subtractStockAvailable: {
            name: 'substractStockAvailable',
            path: 'product/substractStockAvailable'
        },
        addStockAvailable: {
            name: 'addStockAvailable',
            path: 'product/addStockAvailable'
        }
    }
};
