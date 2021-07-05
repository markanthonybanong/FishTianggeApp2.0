import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MyStoreDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { ImageService, PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { ActionSheetController } from '@ionic/angular';
import { Store } from 'rxjs-observable-store';
import { AppStore } from 'src/app/app.store';
import { clearMyStoreForm } from '../../helpers/my-store/clear-my-storm-form';
import { setMyStoreFormValues } from '../../helpers/my-store/set-my-store-form';
import { MyStoreEndpoint } from './my-store-endpoint';
import { MyStoreStoreState } from './my-store-store-state';

@Injectable()
export class MyStoreStore extends Store<MyStoreStoreState> {
    constructor(
        private storageService: StorageService,
        private storeDataService: StoreDataService,
        private dataService: MyStoreDataService,
        private actionSheetController: ActionSheetController,
        private imageService: ImageService,
        private endPoint: MyStoreEndpoint,
        private popOverService: PopOverService,
        private appStore: AppStore
    ){
        super(new MyStoreStoreState());
    }

    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        clearMyStoreForm(this.dataService.storeForm);
        if(user.storeId === null) {
            this.setState({
                ...this.state,
                actionName: 'Add'
            });
        } else {
            this.setState({
                ...this.state,
                actionName: 'Update'
            });
            this.getSellerStore();
        }
    }
    async onUploadImg(): Promise<void> {
        const imgFormControl           = this.dataService.storeForm.get('img') as FormControl;
        const imgForDisplayFormControl = this.dataService.storeForm.get('imgForDisplay') as FormControl;
        const actionSheet              = await this.actionSheetController.create({
          header: 'Select Image source',
          buttons: [
            {
              text: 'Load from Library',
              handler: () => {
                this.imageService.loadFromLibrary()
                  .then( base64 => {
                    imgFormControl.setValue(base64);
                    imgForDisplayFormControl.setValue(this.imageService.safePhotoURL(base64));
                  }).catch (err => {});
              }
            },
            {
              text: 'Use Camera',
              handler: () => {
                this.imageService.takePicture()
                  .then( base64=> {
                    imgFormControl.setValue(base64);
                    imgForDisplayFormControl.setValue(this.imageService.safePhotoURL(base64));
                  }).catch( err => {});
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
          }]
       });
       await actionSheet.present();
    }

    async getSellerStore(): Promise<void> {
      try {
        const user: LoginUser = await this.storageService.get('loginUser');
        const store           = await this.endPoint.getSellerStore(user, this.storeDataService.storeRequestStateUpdater);
        setMyStoreFormValues(this.dataService.storeForm, store);
      } catch (error) {
      }
  }
    async onSubmit(form: FormGroup): Promise<void>{
        try {
          if(this.state.actionName === 'Add'){
            const user: LoginUser = await this.storageService.get('loginUser');
            form.get('userId').patchValue(user.id);
            const store           = await this.endPoint.addStore(form.value, this.storeDataService.storeRequestStateUpdater);
            await this.endPoint.updateUserStoreId({storeId: store.id, id: user.id}, this.storeDataService.storeRequestStateUpdater);
            await this.storageService.set('loginUser', {
              id: user.id,
              userType: user.userType,
              storeId: store.id,
              userName: user.userName
            });
            form.get('id').patchValue(store.id);
            this.appStore.init();
            this.setState({
              ...this.state,
              actionName: 'Update'
            });
            this.popOverService.showPopUp(`Successfully added ${store.name}`);
          } else {
            const store = await this.endPoint.updateStore(form.value, this.storeDataService.storeRequestStateUpdater);
            this.popOverService.showPopUp(`Successfully updated ${store.name}`);
          }
        } catch (error) {
          console.log('error ', error);
          this.popOverService.showPopUp('Something went wrong!!!');
        }
    }
}
