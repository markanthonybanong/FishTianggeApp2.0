export const DELIVERIES_CONFIG = {
    request: {
        getCourierPendingDeliveries : {
            name: 'getCourierPendingDeliveries',
            path: 'deliver/getCourierPendingDeliveries'
        },
        getCourierToDeliverProduct : {
            name: 'getCourierToDeliverProduct',
            path: 'deliver/getCourierToDeliverProduct'
        },
        updateToDeliverStatus: {
            name: 'updateToDeliverStatus',
            path: 'deliver/updateToDeliverStatus'
        },
        updateCourierStatus: {
            name: 'updateCourierStatus',
            path: 'deliver/updateCourierStatus'
        },
        updateOrderSellerStatus: {
            name: 'updateOrderSellerStatus',
            path: 'order/updateOrderSellerStatus'
        },
        deleteToDeliver: {
            name: 'deleteToDeliver',
            path: 'deliver/deleteToDeliver'
        },
        updateOrderStatus: {
            name: 'updateOrderStatus',
            path: 'order/updateOrderStatus'
        },
        getCourierDeliveredDeliveries : {
            name: 'getCourierDeliveredDeliveries',
            path: 'deliver/getCourierDeliveredDeliveries'
        },
        getStoreById: {
            name: 'getStoreById',
            path: 'store/getStoreById'
        }
    }
};
