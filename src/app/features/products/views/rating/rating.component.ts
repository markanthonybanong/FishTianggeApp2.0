import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ImageService } from '@fish-tiangge/shared/services';
import { tap } from 'rxjs/operators';
import { RatingEndpoint } from '../../services/rating/rating-endpoint';
import { RatingStore } from '../../services/rating/rating-store';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [RatingStore, RatingEndpoint]
})
export class RatingComponent implements OnInit {

  constructor(
    public store: RatingStore,
    private route: ActivatedRoute,
    public imageService: ImageService
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
            ratingId: param.get('ratingId'),
            storeId: param.get('storeId'),
            storeName: param.get('storeName')
        });
      })
    ).subscribe();
  }

}
