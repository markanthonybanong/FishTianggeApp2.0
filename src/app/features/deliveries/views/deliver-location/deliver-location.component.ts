import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService } from '@fish-tiangge/shared/services';
import { tap } from 'rxjs/operators';
import { DeliverLocationEndpoint } from '../../services/deliver-location/deliver-location-endpoint';
import { DeliverLocationStore } from '../../services/deliver-location/deliver-location-store';

@Component({
  selector: 'app-deliver-location',
  templateUrl: './deliver-location.component.html',
  styleUrls: ['./deliver-location.component.scss'],
  providers: [DeliverLocationStore, DeliverLocationEndpoint]
})
export class DeliverLocationComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  constructor(
    public store: DeliverLocationStore,
    private route: ActivatedRoute,
    private courMapServie: GeolocationService
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
          deliverId: param.get('deliverId'),
          deliverName: param.get('deliverName'),
          deliverStatus: param.get('deliverStatus'),
          customerName: param.get('customerName'),
          lat: parseFloat(param.get('lat')),
          lng: parseFloat(param.get('lng'))
        });
      })
    ).subscribe();
  }

}
