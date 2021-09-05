import { Store } from '@fish-tiannge/shared/types';

export class StoreState {
    requests = {
        addToSukiList: {
            inProgress: false
        },
        deleteSukiList: {
            inProgress: false
        }
    };
    isFirstLoad     = true; //fixed onBack, on rating, so it wont call the default product-list
    storeId: string = null;
    storeName: string = null;
    routedFrom: string = null;
    sukiListActionBtnName  = 'Add To Suki List';
    alreadyAddedToSukiList = false;
    sukiListId: string     = null;
    loginUserId: string    = null;
    store: Store;
}
