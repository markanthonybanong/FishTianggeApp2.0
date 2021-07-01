import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { ImageService, PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser } from '@fish-tiannge/shared/types';
import { ActionSheetController } from '@ionic/angular';
import { Store } from 'rxjs-observable-store';
import { clearAddProductForm } from '../../helper/add-product/clear-add-product-form';
import { ProductEndpoint } from './product-endpoint';
import { ProductStoreState } from './product-store-state';

@Injectable()
export class ProductStore extends Store<ProductStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private dataService: ProductDataService,
        private storageService: StorageService,
        private imageService: ImageService,
        private actionSheetController: ActionSheetController,
        private endpoint: ProductEndpoint,
        private popOverService: PopOverService
    ){
        super(new ProductStoreState());
    }

    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        clearAddProductForm(this.dataService.productForm);
        const user: LoginUser    = await this.storageService.get('loginUser');
        const storeIdFormControl = this.dataService.productForm.get('storeId') as FormControl;
        storeIdFormControl.patchValue(user.storeId);
    }
    async onUploadImg(): Promise<void> {
        const imgFormControl           = this.dataService.productForm.get('img') as FormControl;
        const imgForDisplayFormControl = this.dataService.productForm.get('imgForDisplay') as FormControl;
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
                    imgFormControl.setValue( base64);
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
    async onSubmit(form: FormGroup): Promise<void>{
        if(form.get('storeId').value === null) {
          this.popOverService.showPopUp('Create a Store first');
        } else {
            try {
               // const product = await this.endpoint.addProduct(form.value, this.storeDataService.storeRequestStateUpdater);
               // clearAddProductForm(form);
               // this.popOverService.showPopUp(`Succesfully added ${product.name}`);
            } catch (error) {
              this.popOverService.showPopUp('Something went wrong!!!');
            }
        }
    }
}
