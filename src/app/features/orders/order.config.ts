export const ORDER_CONFIG = {
    request: {
        getStorePendingOrders: {
            name: 'getStorePendingOrders',
            path: 'order/getStorePendingOrders'
        },
        getPendingOrdersByUserId: {
            name: 'getPendingOrdersByUserId',
            path: 'order/getPendingOrdersByUserId'
        },
        getOrder: {
            name: 'getOrder',
            path: 'order/getOrder'
        },
        getToDeliver: {
            name: 'getToDeliver',
            path: 'deliver/getToDeliver'
        },
        getCouriers: {
            name: 'getCouriers',
            path: 'user/getCouriers'
        },
        getUser: {
            name: 'getUser',
            path: 'user/getUser'
        },
        addToDeliver: {
            name: 'addToDeliver',
            path: 'deliver/addToDeliver'
        },
        updateToDeliver: {
            name: 'updateToDeliver',
            path: 'deliver/updateToDeliver'
        },
        updateOrderStatus: {
            name: 'updateOrderStatus',
            path: 'order/updateOrderStatus'
        },
        getStoreDeliveredOrders: {
            name: 'getStoreDeliveredOrders',
            path: 'order/getStoreDeliveredOrders'
        },
        getDeliveredOrdersByUserId: {
            name: 'getDeliveredOrdersByUserId',
            path: 'order/getDeliveredOrdersByUserId'
        },
    }
};
