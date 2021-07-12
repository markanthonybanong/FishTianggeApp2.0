import { Component, OnInit } from '@angular/core';
import { ImageService } from '@fish-tiangge/shared/services';
import { StoreListEndpoint } from '../../services/store-list/store-list-endpoint';
import { StoreListStore } from '../../services/store-list/store-list-store';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
  providers: [StoreListStore, StoreListEndpoint]
})
export class StoreListComponent implements OnInit {

  constructor(
    public store: StoreListStore,
    public imageService: ImageService
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.store.init();
  }

}
