import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDataService } from '@fish-tiangge/shared/data-service';
import { tap } from 'rxjs/operators';
import { ArchiveEndpoint } from '../../services/archive/archive-endpoint';
import { ArchiveStore } from '../../services/archive/archive-store';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  providers: [ArchiveStore, ArchiveEndpoint]
})
export class ArchiveComponent {

  constructor(
    public store: ArchiveStore,
    public route: ActivatedRoute,
    public productDataService: ProductDataService
  ) { }
  ionViewWillEnter(): void{
    this.subscribeToRouteParameter();
    this.store.init();
  }
  private subscribeToRouteParameter(): void{
    this.route.paramMap
     .pipe(
       tap((params)=>{
        this.store.setState({
          ...this.store.state,
          productId: params.get('productId'),
          productName: params.get('productName')
        });
      })
     ).subscribe();
  }

}
