import { Component, OnInit } from '@angular/core';
import { SignUpDataService } from '@fish-tiangge/shared/data-service';
import { ImageService } from '@fish-tiangge/shared/services';
import { MenuController } from '@ionic/angular';
import { MyAccountEndpoint } from '../../services/my-account/my-account-endpoint';
import { MyAccountStore } from '../../services/my-account/my-account-store';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  providers: [MyAccountStore, MyAccountEndpoint]
})
export class MyAccountComponent implements OnInit {

  constructor(
    private menu: MenuController,
    public signUpDataService: SignUpDataService,
    public store: MyAccountStore,
    public imageService: ImageService
  ) { }

  ngOnInit() {}
  openMenu(): void{
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }
  ionViewWillEnter(): void{
    this.store.init();
  }
}
