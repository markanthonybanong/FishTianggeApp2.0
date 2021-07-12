import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/features/products/services/store/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [Store]
})
export class StoreComponent implements OnInit {

  constructor(
    public store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.subscribeToRouteParameters();
    this.store.init();
  }
  subscribeToRouteParameters(): void{
    this.route.paramMap.pipe(
      tap((param) => {
        this.store.setState({
          ...this.store.state,
          storeId: param.get('storeId'),
          storeName: param.get('storeName')
        });
      })
    ).subscribe();
  }

}
