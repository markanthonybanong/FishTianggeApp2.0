import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CategoryStore } from '../../services/category/category-store';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers:[CategoryStore]
})
export class CategoryComponent implements OnInit {

  constructor(
    public store: CategoryStore,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {}
  ionViewWillEnter(): void {
    this.subscribeToRoutParameter();
    this.store.init();
  }
  subscribeToRoutParameter(): void{
    this.route.paramMap.pipe(
      tap((param) =>{
        this.store.setState({
          ...this.store.state,
          actionType: param.get('actionType'),
          categoryId: param.get('id'),
          routedFrom: param.get('routedFrom')
        });
      })
    ).subscribe();
  }
}
