import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { formatDate, getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { PopOverService } from '@fish-tiangge/shared/services';
import { Store } from 'rxjs-observable-store';
import { StoreRatingEndpoint } from './store-rating-endpoint';
import { StoreRatingStoreState } from './store-rating-store-state';

@Injectable()
export class StoreRatingStore extends Store<StoreRatingStoreState>{
    constructor(
        private endpoint: StoreRatingEndpoint,
        private storeDataService: StoreDataService,
        private router: Router,
        private popOverService: PopOverService
    ){
        super( new StoreRatingStoreState());
    }
    init(): void{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.getRating();
    }
    async getRating(): Promise<void>{
        const rating = await this.endpoint.getRating({id: this.state.ratingId}, this.storeDataService.storeRequestStateUpdater);
        this.setState({
            ...this.state,
            rating,
            dateRate: formatDate(rating.date_rate)
        });
    }
    onBack(): void{
        this.router.navigateByUrl('store-rating');
    }
    async onDelete(): Promise<void>{
        try {
            await this.endpoint.deleteRating(this.state.rating.id, this.storeDataService.storeRequestStateUpdater);
            this.router.navigateByUrl('store-rating');
            this.popOverService.showPopUp('Deleted Rating');
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
}
