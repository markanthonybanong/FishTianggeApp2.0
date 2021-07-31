import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from '@fish-tiangge/shared/services';
import { Store } from 'rxjs-observable-store';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { DeliverLocationStoreState } from './deliver-location-store-state';
import { DeliverLocationEndpoint } from './deliver-location-endpoint';
@Injectable()
export class DeliverLocationStore extends Store<DeliverLocationStoreState>{
    private interValId: any;
    constructor(
        private router: Router,
        private courMapService: GeolocationService,
        private endpoint: DeliverLocationEndpoint,
        private storeDataService: StoreDataService
    ){
        super(new DeliverLocationStoreState());
    }
    init(): void{
       this.courMapService.loadMap(this.state.lat, this.state.lng);
       this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    }
    onBackBtn(): void{
        // eslint-disable-next-line max-len
        this.router.navigateByUrl(`deliveries/deliver/deliverList/${this.state.deliverId}/${this.state.deliverName}/${this.state.deliverStatus}`);
    }
}
