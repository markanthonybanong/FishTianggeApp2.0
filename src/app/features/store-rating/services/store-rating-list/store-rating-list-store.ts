import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { StorageService } from '@fish-tiangge/shared/services';
import { LoginUser, Rating } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { StoreRatingListEndpoint } from './store-rating-list-endpoint';
import { StoreRatingListStoreState } from './store-rating-list-store-state';

@Injectable()
export class StoreRatingListStore extends Store<StoreRatingListStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private endpoint: StoreRatingListEndpoint,
        private router: Router,
        private storageService: StorageService
    ){
        super(new StoreRatingListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            storeId: user.storeId
        });
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
        const rateBy = `${rating.first_name} ${rating.last_name}`;
        this.router.navigateByUrl(`/store-rating/store-rating/${rating.id}/${rateBy}`);
    }
}
