import { Component, OnInit } from '@angular/core';
import { ImageService } from '@fish-tiangge/shared/services';
import { MenuController } from '@ionic/angular';
import { ArchiveListEndpoint } from '../../services/archive-list/archive-list-endpoint';
import { ArchiveListStore } from '../../services/archive-list/archive-list-store';
 
@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss'],
  providers: [ArchiveListStore, ArchiveListEndpoint]
})
export class ArchiveListComponent implements OnInit {

  constructor(
    private menu: MenuController,
    public store: ArchiveListStore,
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
