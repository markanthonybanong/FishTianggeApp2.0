import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { MetaKey } from '@fish-tiangge/shared/enums';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { GlobalEndpoint } from 'src/app/global-store/global-endpoint';
import { CategoryListStoreState } from './category-list-store-state';

@Injectable()
export class CategoryListStore extends Store<CategoryListStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private storageDataService: StorageService,
        private globalEndpoint: GlobalEndpoint,
        private router: Router
    ){
        super( new CategoryListStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageDataService.get('loginUser');
        this.setState({
            ...this.state,
            loginUserId: user.id
        });
        this.getSellerProductCategories();
    }
    async getSellerProductCategories($event: any = null): Promise<void>{
        try {
            const categories = await this.globalEndpoint.selectUserMetaByUserIdAndMetaKey(
                               {userId: this.state.loginUserId, metaKey: MetaKey.SELLERPRODUCTCATEGORY},
                               this.storeDataService.storeRequestStateUpdater
            );
            this.setState({
                ...this.state,
                categories,
                searchCategories: categories
            });
            if($event){
                $event.target.complete();
            }
        } catch (error) {
            if($event){
                $event.target.complete();
            }
        }
    }
    onRefresh($event: any): void{
        this.getSellerProductCategories($event);
    }
    onSearchStores($event: any): void{
        const query            = $event.target.value.toLowerCase();
        // eslint-disable-next-line max-len
        const searchCategories = this.state.categories.filter( (userMeta) => userMeta.meta_value.toLowerCase().indexOf(query.toLowerCase()) > -1);
        this.setState({
            ...this.state,
            searchCategories
        });
    }
    onCategoryClick(category: any): void{
        this.router.navigateByUrl(`products/categories/category-list/category/${category.id}/updateCategory/categoryList`);
    }

}
