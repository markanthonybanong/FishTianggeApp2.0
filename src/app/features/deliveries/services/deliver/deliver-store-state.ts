export class DeliverStoreState {
    requests = {
        updateOrderSellerStatus: {
            inProgress: false
        },
        deleteToDeliver: {
            inProgress: false
        },
        updateOrderStatus: {
            inProgress: false
        },
        updateToDeliverStatus: {
            inProgress: false
        },
    };
    routedFrom: string    = null;
    deliverId: string     = null;
    deliverName: string   = null;
    orderId: number       = null;
    deliverStatus: string = null;
    courierId: string     = null;
}
