import { Component, OnInit } from '@angular/core';
import { ImageService } from '@fish-tiangge/shared/services';
import { DeliverHistoryListEndpoint } from '../../services/deliver-history-list/deliver-history-list-endpoint';
import { DeliverHistoryListStore } from '../../services/deliver-history-list/deliver-history-list-store';

@Component({
  selector: 'app-deliver-history-list',
  templateUrl: './deliver-history-list.component.html',
  styleUrls: ['./deliver-history-list.component.scss'],
  providers: [DeliverHistoryListStore, DeliverHistoryListEndpoint]
})
export class DeliverHistoryListComponent implements OnInit {

  constructor(
    public store: DeliverHistoryListStore,
    public imageService: ImageService
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.store.init();
  }

}
