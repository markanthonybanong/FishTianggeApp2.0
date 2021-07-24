import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'rxjs-observable-store';
import { CategoriesStoreState } from './categories-store-state';
@Injectable()
export class CategoriesStore extends Store<CategoriesStoreState>{

    constructor(
        private router: Router
    ){
        super(new CategoriesStoreState());
    }

    onSegmentChanged($event: any): void{
        if($event.detail.value === 'myCategory'){
            this.router.navigateByUrl('products/categories');
        } else {
            this.router.navigateByUrl('products/categories/add-category/addCategory');
        }
    }
}
