import { Component, OnInit } from '@angular/core';
import { ImageService } from '@fish-tiangge/shared/services';
import { MenuController } from '@ionic/angular';
import { StoreRatingListEndpoint } from '../../services/store-rating-list/store-rating-list-endpoint';
import { StoreRatingListStore } from '../../services/store-rating-list/store-rating-list-store';

@Component({
  selector: 'app-store-rating-list',
  templateUrl: './store-rating-list.component.html',
  styleUrls: ['./store-rating-list.component.scss'],
  providers: [StoreRatingListStore, StoreRatingListEndpoint]
})
export class StoreRatingListComponent implements OnInit {

  constructor(
    private menu: MenuController,
    public store: StoreRatingListStore,
    public imageService: ImageService
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
