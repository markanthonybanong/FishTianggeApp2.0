import { Rating } from '@fish-tiannge/shared/types';

export class RatingListStoreState {
    storeId: string  = null;
    storeName: string = null;
    ratings: Rating[] = [];
}
