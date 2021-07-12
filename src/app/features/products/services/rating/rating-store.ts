/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { formatDate, getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { RatingEndpoint } from './rating-endpoint';
import { RatingStoreState } from './rating-store-state';

@Injectable()
export class RatingStore extends Store<RatingStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private router: Router,
        private storageService: StorageService,
        private endpoint: RatingEndpoint,
        private popOverService: PopOverService
    ){
        super(new RatingStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            loginUserId: user.id
        });
        this.getRating();
    }
    onBack(): void{
        // eslint-disable-next-line max-len
        this.router.navigateByUrl(`products/store-list/store/${this.state.storeId}/${this.state.storeName}/rating-list/${this.state.storeId}/${this.state.storeName}`);
    }
    async getRating(): Promise<void>{
        const rating = await this.endpoint.getRating({id: this.state.ratingId}, this.storeDataService.storeRequestStateUpdater);
        this.setState({
            ...this.state,
            rating,
            dateRate: formatDate(rating.date_rate)
        });
        // eslint-disable-next-line eqeqeq
        if(rating.user_id == this.state.loginUserId){
            this.setState({
                ...this.state,
                readOnly: false,
                canPerformAction: true
            });
        }

    }
    onRatingChange($event: any): void{
        this.setState({
            ...this.state,
            rating: {
                ...this.state.rating,
                star_number: $event
            }
        });
    }
    async onUpdate(): Promise<void>{
        try {
            const ratingBody = {
                dateRate: formatDate(new Date()),
                starNumber: this.state.rating.star_number,
                userComment: this.state.rating.user_comment,
                id: this.state.ratingId
            };
            const rating = await this.endpoint.updateRating(ratingBody, this.storeDataService.storeRequestStateUpdater);
            this.setState({
                ...this.state,
                dateRate: formatDate(rating.date_rate)
            });
            this.popOverService.showPopUp('Updated Rating');
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
    async onDelete(): Promise<void>{
        try {
            await this.endpoint.deleteRating(this.state.ratingId, this.storeDataService.storeRequestStateUpdater);
            this.popOverService.showPopUp('Deleted Rating');
            this.onBack();
        } catch (error) {
            console.log('error ', error);
            
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
}
