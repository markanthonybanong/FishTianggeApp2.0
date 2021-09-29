import { NullTemplateVisitor } from '@angular/compiler';
import { Store, User } from '@fish-tiannge/shared/types';

export class OrderStoreState {
    requests = {
        addToDeliver: {
            inProgress: false,
        },
        updateToDeliver: {
            inProgress: false,
        },
        addRating: {
            inProgress: false
        },
        selectRatingByUserId: {
            inProgress: false
        },
        updateOrderStatus: {
            inProgress: false
        }
    };
    loginUserId: string = null;
    userType: string   = null;
    orderId:  string    = null;
    orderName: string   = null;
    routedFrom: string  = null;
    orderStatus: string = null;
    orderSellerStatus: string = null;
    couriers: User[]    = [];
    courierName: string = null;
    storeId: string = null;
    warningMsgs: string[] = [];
    alreadyAddedStoreRating = false;
    deliverId: string = null;
    alreadyAddedStoreReport    = false;
    courerHaveEnableWatch      = false;
    courierId: string          = null;
    lat: number                = null;
    lng: number                = null;
    customerAddressLat: number = null;
    customerAddressLng: number = null;
    isShowBuyerLocationBtn     = false;
    customerName: string       = null;
    haveBuyerClassification    = false;
    store: Store;
}

