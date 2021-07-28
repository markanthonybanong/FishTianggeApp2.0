/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Rating } from "@fish-tiannge/shared/types";

export class StoreRatingStoreState {
    requests = {
        deleteRating: {
            inProgress: false
        }
    };
    ratingId: string = null;
    rating: Rating = {
        img: null,
        user_comment: '',
        first_name: null,
        last_name: null,
        star_number: null,
    };
    dateRate: string = null;
    rateBy: string   = null;
}
