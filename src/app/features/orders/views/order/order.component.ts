import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDataService } from '@fish-tiangge/shared/data-service';
import { ImageService } from '@fish-tiangge/shared/services';
import { tap } from 'rxjs/operators';
import { OrderEndpoint } from '../../services/order/order-endpoint';
import { OrderStore } from '../../services/order/order-store';
import { io } from 'socket.io-client';
import { APP_CONFIG } from 'src/app/app.config';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderStore, OrderEndpoint]
})
export class OrderComponent implements OnInit {
  private socket = io(APP_CONFIG.apiUrl);
  constructor(
    private route: ActivatedRoute,
    public store: OrderStore,
    public dataService: OrderDataService,
    public imageService: ImageService

  ) {
    this.socket.on('connect', () =>{
    });
  }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.subscribeToRouteParameter();
    this.store.init();
  }
  ionViewWillLeave(): void{
    this.socket.off();
    console.log('should stop listening');
  }
  subscribeToRouteParameter(): void{
    this.route.paramMap.pipe(
      tap((param) => {
        this.store.setState({
          ...this.store.state,
          orderId: param.get('orderId'),
          orderName: param.get('orderName'),
          routedFrom: param.get('routedFrom'),
          orderStatus: param.get('orderStatus'),
          orderSellerStatus: param.get('orderSellerStatus'),
          storeId: param.get('storeId')
        });
      })
    ).subscribe();
  }

}
