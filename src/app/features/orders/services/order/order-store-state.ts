import { NullTemplateVisitor } from '@angular/compiler';
import { User } from '@fish-tiannge/shared/types';

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
    warningMsg: string = null;
    alreadyAddedStoreRating = false;
}
