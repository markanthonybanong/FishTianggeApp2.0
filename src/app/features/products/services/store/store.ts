/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { StoreState } from './store-state';
import { Store as StoreRxJs} from 'rxjs-observable-store';
import { Router } from '@angular/router';
import { GlobalStore } from 'src/app/global-store/global-store';
import { StoreEndpoint } from './store-endpoint';
import { StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { ModalController } from '@ionic/angular';
import { ModalStoreInformationComponent } from '../../modals/store/modal-store-information/modal-store-information.component';

@Injectable()
export class Store extends StoreRxJs<StoreState>{
    constructor(
        private router: Router,
        private globalStore: GlobalStore,
        private endpoint: StoreEndpoint,
        private storeDataService: StoreDataService,
        private popOverService: PopOverService,
        private storageService: StorageService,
        private modalController: ModalController
    ){
        super(new StoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        if(this.state.isFirstLoad){
            this.router.navigateByUrl(`products/store-list/store/${this.state.storeId}/${this.state.storeName}/product-list/${this.state.storeId}/${this.state.storeName}`);
        }
        this.setState({
            ...this.state,
            loginUserId: user.id
        });
        this.canAddToSukiList();
        this.getStore();
    }
    onSegmentChanged($event: any): void{
        this.setState({
            ...this.state,
            isFirstLoad: false
        });
        if($event.detail.value === 'products'){
            this.router.navigateByUrl(`products/store-list/store/${this.state.storeId}/${this.state.storeName}/product-list/${this.state.storeId}/${this.state.storeName}`);
        } else {
            this.router.navigateByUrl(`products/store-list/store/${this.state.storeId}/${this.state.storeName}/rating-list/${this.state.storeId}/${this.state.storeName}`);
        }
    }
    onBack(): void{
        if(this.globalStore.state.storeRoutedFrom === 'sukiList'){
            this.router.navigateByUrl('suki-list');
        } else {
            this.router.navigateByUrl('products/store-list');
        }
    }
    async onSubmitSukiList(): Promise<void>{
        try {
            if(this.state.alreadyAddedToSukiList){
                await this.endpoint.deleteFromSukiList(
                    this.state.sukiListId,
                    this.storeDataService.storeRequestStateUpdater
                );
                this.setState({
                    ...this.state,
                    alreadyAddedToSukiList: false,
                    sukiListActionBtnName: 'Add To Suki List'
                });
                this.popOverService.showPopUp('Deleted');
            } else {
                const result = await this.endpoint.addToSukiList(
                                    {userId: this.state.loginUserId, storeId: this.state.storeId},
                                    this.storeDataService.storeRequestStateUpdater
                               );
                this.setState({
                    ...this.state,
                    alreadyAddedToSukiList: true,
                    sukiListId: result.id,
                    sukiListActionBtnName: 'Delete From Suki List'
                });
                this.popOverService.showPopUp('Added');
            }
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
    async canAddToSukiList(): Promise<void>{
        try {
            const sukiList = await this.endpoint.sukiListSelectByUserAndStoreId(
                             {userId: this.state.loginUserId, storeId: this.state.storeId},
                             this.storeDataService.storeRequestStateUpdater
                             );
            if(sukiList !== null){
                this.setState({
                    ...this.state,
                    alreadyAddedToSukiList: true,
                    sukiListActionBtnName: 'Delete From Suki List',
                    sukiListId: sukiList.id
                });
            }
        } catch (error) {
        }
    }
    async getStore(): Promise<void>{
        const store = await this.endpoint.getStoreById({id: this.state.storeId}, this.storeDataService.storeRequestStateUpdater);
        this.setState({
            ...this.state,
            store
        });
    }
    async onStoreInformation(): Promise<void>{
        const modal = await this.modalController.create({
            component: ModalStoreInformationComponent,
            componentProps: {
                store: this.state.store
            }
          });
          return await modal.present();
    }
}
