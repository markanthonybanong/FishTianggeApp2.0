import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { Rating } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { RatingListEndpoint } from './rating-list-endpoint';
import { RatingListStoreState } from './rating-list-store-state';

@Injectable()
export class RatingListStore extends Store<RatingListStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private endpoint: RatingListEndpoint,
        private router: Router
    ){
        super(new RatingListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.getRatings();
    }
    async getRatings($event: any = null): Promise<void>{
        try {
            const ratings = await this.endpoint.selectRatingsByStoreId(
                            {storeId: this.state.storeId},
                            this.storeDataService.storeRequestStateUpdater
                            );
            this.setState({
                ...this.state,
                ratings,
            });
            if($event){
                $event.target.complete();
            }
        } catch (error) {
            if($event){
                $event.target.complete();
            }
        }
    }
    onRefresh($event: any): void{
        this.getRatings($event);
    }
    onRatingClick(rating: Rating): void{
        this.router.navigateByUrl(`products/rating-list/rating/${rating.id}/${this.state.storeId}/${this.state.storeName}`);
    }
}
