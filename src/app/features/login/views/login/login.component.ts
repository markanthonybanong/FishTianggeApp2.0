import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDataService } from '@fish-tiangge/shared/data-service';
import { LoginStore } from '../../services/login-store';
import { LoginEndpoint } from '../../services/login-endpoint';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginStore, LoginEndpoint]
})
export class LoginComponent implements OnInit {

  constructor(
    public store: LoginStore,
    public dataService: LoginDataService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void{
    this.store.init();
  }

}
