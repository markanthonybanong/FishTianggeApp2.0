import { Component, OnInit } from '@angular/core';
import { ImageService } from '@fish-tiangge/shared/services';
import { DeliverListEndpoint } from '../../services/deliver-list/deliver-list-endpoint';
import { DeliverListStore } from '../../services/deliver-list/deliver-list-store';

@Component({
  selector: 'app-deliver-list',
  templateUrl: './deliver-list.component.html',
  styleUrls: ['./deliver-list.component.scss'],
  providers: [DeliverListStore, DeliverListEndpoint]
})
export class DeliverListComponent implements OnInit {

  constructor(
    public imageService: ImageService,
    public store: DeliverListStore
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.store.init();
  }

}
