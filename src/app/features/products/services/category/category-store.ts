import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { MetaKey } from '@fish-tiangge/shared/enums';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser, UserMeta } from '@fish-tiannge/shared/types';
import { Store } from 'rxjs-observable-store';
import { GlobalEndpoint } from 'src/app/global-store/global-endpoint';
import { CategoryStoreState } from './category-store-state';

@Injectable()
export class CategoryStore extends Store<CategoryStoreState>{
    constructor(
        private globalEndpoint: GlobalEndpoint,
        private storageService: StorageService,
        private storeDataService: StoreDataService,
        private popOverService: PopOverService,
        private router: Router
    ){
        super(new CategoryStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        this.setState({
            ...this.state,
            category: '',
            btnName: 'Add',
            loginUserId: user.id
        });
        if(this.state.actionType === 'updateCategory'){
            this.setState({
                ...this.state,
                btnName: 'Update'
            });
            this.getCategory();
        }
    }
    async onSubmit(): Promise<void>{
        try {
            if(this.state.actionType === 'addCategory'){
                const userMeta: UserMeta = await this.globalEndpoint.addUserMeta(
                    {userId: this.state.loginUserId, metaKey: MetaKey.SELLERPRODUCTCATEGORY, metaValue: this.state.category},
                    this.storeDataService.storeRequestStateUpdater
                );
                this.setState({
                    ...this.state,
                    actionType: 'updateCategory',
                    categoryId: userMeta.id,
                    btnName: 'Update'
                });
                this.popOverService.showPopUp('Added');
            } else {
                await this.globalEndpoint.updateUserMeta(
                    {id: this.state.categoryId, metaKey: MetaKey.SELLERPRODUCTCATEGORY, metaValue: this.state.category},
                    this.storeDataService.storeRequestStateUpdater
                );
                this.popOverService.showPopUp('Updated');
            }
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
    onBack(): void{
        this.router.navigateByUrl('products/categories/category-list');
    }
    async getCategory(): Promise<void>{
        const userMeta: UserMeta = await this.globalEndpoint.selectUserMetaById(
                                    {id: this.state.categoryId},
                                    this.storeDataService.storeRequestStateUpdater
                                  );
        this.setState({
            ...this.state,
            category: userMeta.meta_value
        });
    }
    async onDelete(): Promise<void>{
        try {
            this.globalEndpoint.deleteUserMeta(this.state.categoryId, this.storeDataService.storeRequestStateUpdater);
            this.router.navigateByUrl('products/categories/category-list');
            this.popOverService.showPopUp('Deleted');
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
}
