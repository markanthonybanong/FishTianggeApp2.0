import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '@fish-tiangge/shared/services';
import { tap } from 'rxjs/operators';
import { StoreRatingEndpoint } from '../../services/store-rating/store-rating-endpoint';
import { StoreRatingStore } from '../../services/store-rating/store-rating-store';

@Component({
  selector: 'app-store-rating',
  templateUrl: './store-rating.component.html',
  styleUrls: ['./store-rating.component.scss'],
  providers: [StoreRatingStore, StoreRatingEndpoint]
})
export class StoreRatingComponent implements OnInit {

  constructor(
    public store: StoreRatingStore,
    public imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.subscribeToRouteParameter();
    this.store.init();
  }
  subscribeToRouteParameter(): void{
    this.route.paramMap.pipe(
      tap((param)=>{
        this.store.setState({
            ...this.store.state,
            ratingId: param.get('id'),
            rateBy: param.get('rateBy')
        });
      })
    ).subscribe();
  }

}
