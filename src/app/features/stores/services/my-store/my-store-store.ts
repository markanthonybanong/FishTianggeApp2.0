import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyStoreDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { ImageService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { ActionSheetController } from '@ionic/angular';
import { Store } from 'rxjs-observable-store';
import { MyStoreStoreState } from './my-store-store-state';

@Injectable()
export class MyStoreStore extends Store<MyStoreStoreState> {
    constructor(
        private storageService: StorageService,
        private storeDataService: StoreDataService,
        private dataService: MyStoreDataService,
        private actionSheetController: ActionSheetController,
        private imageService: ImageService
    ){
        super(new MyStoreStoreState());
    }

    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        const user: LoginUser = await this.storageService.get('loginUser');
        const formControl = this.dataService.storeForm.get('userId') as FormControl;
        formControl.patchValue(user.id);
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
    onSubmit(): void{
        
    }
}
