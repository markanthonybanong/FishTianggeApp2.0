import { Component, OnInit } from '@angular/core';
import { CategoryListEndpoint } from '../../services/category-list/category-list-endpoint';
import { CategoryListStore } from '../../services/category-list/category-list-store';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [CategoryListStore, CategoryListEndpoint]
})
export class CategoryListComponent implements OnInit {

  constructor(
    public store: CategoryListStore
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void{
    this.store.init();
  }
}
