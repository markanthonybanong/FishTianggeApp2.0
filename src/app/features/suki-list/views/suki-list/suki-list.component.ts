import { Component, OnInit } from '@angular/core';
import { ImageService } from '@fish-tiangge/shared/services';
import { MenuController } from '@ionic/angular';
import { SukiListEndpoint } from '../../services/suki-list/suki-list-endpoint';
import { SukiListStore } from '../../services/suki-list/suki-list-store';

@Component({
  selector: 'app-suki-list',
  templateUrl: './suki-list.component.html',
  styleUrls: ['./suki-list.component.scss'],
  providers: [SukiListStore, SukiListEndpoint]
})
export class SukiListComponent implements OnInit {

  constructor(
    public store: SukiListStore,
    public imageService: ImageService,
    private menu: MenuController
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.store.init();
  }
  openMenu(): void {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }

}
