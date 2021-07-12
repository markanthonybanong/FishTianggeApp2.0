import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '@fish-tiangge/shared/services';
import { tap } from 'rxjs/operators';
import { RatingListEndpoint } from '../../services/rating-list/rating-list-endpoint';
import { RatingListStore } from '../../services/rating-list/rating-list-store';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss'],
  providers: [RatingListStore, RatingListEndpoint]
})
export class RatingListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public store: RatingListStore,
    public imageService: ImageService
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.subscribeToRouteParameter();
    this.store.init();
  }
  subscribeToRouteParameter(): void{
    this.route.paramMap.pipe(
      tap((param) =>{
        this.store.setState({
          ...this.store.state,
          storeId: param.get('storeId'),
          storeName: param.get('storeName')
        });
      })
    ).subscribe();
  }

}
