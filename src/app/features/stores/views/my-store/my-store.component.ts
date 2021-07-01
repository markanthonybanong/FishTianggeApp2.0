import { Component, OnInit } from '@angular/core';
import { MyStoreDataService } from '@fish-tiangge/shared/data-service';
import { MenuController } from '@ionic/angular';
import { MyStoreEndpoint } from '../../services/my-store/my-store-endpoint';
import { MyStoreStore } from '../../services/my-store/my-store-store';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.scss'],
  providers: [MyStoreStore, MyStoreEndpoint]
})
export class MyStoreComponent implements OnInit {

  constructor(
    public store: MyStoreStore,
    private menu: MenuController,
    public dataService: MyStoreDataService
  ) { }

  ngOnInit() {
    this.store.init();
  }
  openMenu(): void {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }
}
