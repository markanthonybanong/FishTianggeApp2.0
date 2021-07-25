import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourierMapService } from '@fish-tiangge/shared/services';
import { tap } from 'rxjs/operators';
import { OrderLocationEndpoint } from '../../services/order-location/order-location-endpoint';
import { OrderLocationStore } from '../../services/order-location/order-location-store';

@Component({
  selector: 'app-order-location',
  templateUrl: './order-location.component.html',
  styleUrls: ['./order-location.component.scss'],
  providers: [OrderLocationStore, OrderLocationEndpoint]
})
export class OrderLocationComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  constructor(
    public store: OrderLocationStore,
    private route: ActivatedRoute,
    private courMapServie: CourierMapService
  ) { }

  ngOnInit() {}

  ionViewWillEnter(): void{
    this.subscribeToRouteParameter();
    this.store.init();
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewChecked() {
    this.courMapServie.setMapElement(this.mapElement);
  }
  subscribeToRouteParameter(): void{
    this.route.paramMap.pipe(
      tap((param) =>{
        this.store.setState({
          ...this.store.state,
          orderId: param.get('orderId'),
          orderName: param.get('orderName'),
          orderStatus: param.get('orderStatus'),
          orderSellerStatus: param.get('orderSellerStatus'),
          storeId: param.get('storeId'),
          lat: parseFloat(param.get('lat')),
          lng: parseFloat(param.get('lng'))
        });
      })
    ).subscribe();
  }
  ionViewWillLeave(): void{
    this.store.clearInterVal();
  }

}
