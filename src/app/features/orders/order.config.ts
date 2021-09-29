export const ORDER_CONFIG = {
    request: {
        getStoreNoneOrders: {
            name: 'getStoreNoneOrders',
            path: 'order/getStoreNoneOrders'
        },
        getStorePendingOrders: {
            name: 'getStorePendingOrders',
            path: 'order/getStorePendingOrders'
        },
        getStoreAcceptOrders: {
            name: 'getStoreAcceptOrders',
            path: 'order/getStoreAcceptOrders'
        },
        getStoreDeclineOrders: {
            name: 'getStoreDeclineOrders',
            path: 'order/getStoreDeclineOrders'
        },
        getStoreOnTheWayOrders: {
            name: 'getStoreOnTheWayOrders',
            path: 'order/getStoreOnTheWayOrders'
        },
        getStoreDeliverOrders: {
            name: 'getStoreDeliverOrders',
            path: 'order/getStoreDeliverOrders'
        },
        getStoreAllOrders: {
            name: 'getStoreAllOrders',
            path: 'order/getStoreAllOrders'
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
        addRating: {
            name: 'addRating',
            path: 'rating/add'
        },
        selectRatingByUserAndOrderId: {
            name: 'selectRatingByUserAndOrderId',
            path: 'rating/selectByUserAndOrderId'
        },
        updateToDeliverStatus: {
            name: 'updateToDeliverStatus',
            path: 'deliver/updateToDeliverStatus'
        },
        addReport: {
            name: 'addReport',
            path: 'report/add'
        },
        selectReportByUserAndOrderId: {
            name: 'selectReportByUserAndOrderId',
            path: 'report/selectReportByUserAndOrderId'
        },
        getStoreById: {
            name: 'getStoreById',
            path: 'store/getStoreById'
        }
    }
};
