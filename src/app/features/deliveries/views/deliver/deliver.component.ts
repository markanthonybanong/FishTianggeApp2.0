import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDataService } from '@fish-tiangge/shared/data-service';
import { ImageService } from '@fish-tiangge/shared/services';
import { tap } from 'rxjs/operators';
import { DeliverEndpoint } from '../../services/deliver/deliver-endpoint';
import { DeliverStore } from '../../services/deliver/deliver-store';

@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss'],
  providers: [DeliverStore, DeliverEndpoint]
})
export class DeliverComponent{

  constructor(
    public store: DeliverStore,
    private route: ActivatedRoute,
    public orderDataService: OrderDataService,
    public imageService: ImageService
  ) { }

  ionViewWillEnter(): void{
    this.subscribeToRouteParameter();
    this.store.init();
  }
  subscribeToRouteParameter(): void{
    this.route.paramMap.pipe(
      tap((param) => {
        this.store.setState({
          ...this.store.state,
          routedFrom: param.get('routedFrom'),
          deliverId: param.get('deliverId'),
          deliverName: param.get('deliverName'),
          deliverStatus: param.get('deliverStatus')
        });
      })
    ).subscribe();
  }

}
