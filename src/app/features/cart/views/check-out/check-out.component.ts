import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutDataService } from '@fish-tiangge/shared/data-service';
import { ImageService } from '@fish-tiangge/shared/services';
import { tap } from 'rxjs/operators';
import { CheckOutEndpoint } from '../../services/check-out/check-out-endpoint';
import { CheckOutStore } from '../../services/check-out/check-out-store';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  providers: [CheckOutStore, CheckOutEndpoint]
})
export class CheckOutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public store: CheckOutStore,
    public dataService: CheckoutDataService,
    public imageService: ImageService

  ) { }

  ngOnInit() {}

  ionViewWillEnter(): void{
    this.subscribeToRouteParameter();
    this.store.init();
  }
  subscribeToRouteParameter(): void{
    this.route.paramMap.pipe(
      tap((params) =>{
        this.store.setState({
          ...this.store.state,
          userId: params.get('userId'),
          paymentType: params.get('paymentType')
        });
      })
    ).subscribe();
  }

}
