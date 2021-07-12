/* eslint-disable @typescript-eslint/naming-convention */
import { Rating } from '@fish-tiannge/shared/types';

export class RatingStoreState {
    requests = {
        updateRating: {
            inProgress: false
        }
    };
    loginUserId: string = null;
    ratingId: string  = null;
    storeId: string   = null;
    storeName: string = null;
    rating: Rating = {
        img: null,
        user_comment: '',
        first_name: null,
        last_name: null,
        star_number: null
    };
    readOnly = true;
    canPerformAction = false;
    dateRate: string = null;
}
