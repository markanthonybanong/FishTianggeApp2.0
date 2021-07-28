import { Component, OnInit } from '@angular/core';
import { ForgotPasswordEndpoint } from '../../services/forgot-password/forgot-password-endpoint';
import { ForgotPasswordStore } from '../../services/forgot-password/forgot-password-store';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ForgotPasswordStore, ForgotPasswordEndpoint]
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public store: ForgotPasswordStore
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.store.init();
  }

}
