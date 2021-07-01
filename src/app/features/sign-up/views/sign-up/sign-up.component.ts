import { Component, OnInit } from '@angular/core';
import { SignUpEndpoint } from '../../services/sign-up-endpoint';
import { SignUpStore } from '../../services/sign-up-store';
import { SignUpDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SignUpStore, SignUpEndpoint]
})
export class SignUpComponent implements OnInit {

  constructor(
    public store: SignUpStore,
    public dataService: SignUpDataService,
    public storeDataService: StoreDataService
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
