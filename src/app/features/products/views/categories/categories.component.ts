import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesStore } from '../../services/categories/categories-store';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesStore]
})
export class CategoriesComponent implements OnInit {

  constructor(
    private router: Router,
    public store: CategoriesStore
  ) { }

  ngOnInit() {}

  onBack(): void{
    this.router.navigateByUrl('products/product-list');
  }

}
