import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { MetaKey, ProductStatus } from '@fish-tiangge/shared/enums';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { ImageService, PopOverService, StorageService } from '@fish-tiangge/shared/services';
import { LoginUser, UserMeta } from '@fish-tiannge/shared/types';
import { ActionSheetController } from '@ionic/angular';
import { Store } from 'rxjs-observable-store';
import { GlobalEndpoint } from 'src/app/global-store/global-endpoint';
import { clearProductForm } from '../../helper/product/clear-product-form';
import { setProductForm } from '../../helper/product/set-product-form';
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
        private popOverService: PopOverService,
        private router: Router,
        private globalEndpoint: GlobalEndpoint
    ){
        super(new ProductStoreState());
    }
    async init(): Promise<void>{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        clearProductForm(this.dataService.productForm);
        const user: LoginUser = await this.storageService.get('loginUser');
        if(user.userType === 'Seller'){
          let sellerBtnName: string = null;
          if(this.state.actionType === 'add'){
            sellerBtnName = 'Add';
          } else {
            this.setState({
              ...this.state,
              isShowHeader: true
            });
            sellerBtnName = 'Update';
          }
          this.dataService.productForm.get('storeId').patchValue(user.storeId);
          this.setState({
            ...this.state,
            userType: 'Seller',
            sellerBtnName,
            loginUserId: user.id
          });
          this.getSellerCategory();
        } else {
          this.dataService.productForm.get('userId').patchValue(user.id);
          this.setState({
            ...this.state,
            userType: 'Buyer',
            isShowHeader: true,
            disableInput: true
          });
        }
        if(this.state.actionType !== 'add'){
          this.getStoreProduct();
        }
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
    async getStoreProduct(): Promise<void> {
      try {
          const product = await this.endpoint.getStoreProduct(
            {productId: this.state.productId}, this.storeDataService.storeRequestStateUpdater
          );
          if(product.img !== null) {
            const imgForDisplayFormControl = this.dataService.productForm.get('imgForDisplay') as FormControl;
            imgForDisplayFormControl.patchValue(this.imageService.safePhotoURL(product.img));
          }
          this.setState({
            ...this.state,
            classificationSeller: product.classification_seller
          });
          setProductForm(product, this.dataService.productForm);
      } catch (error) {
      }
    }
    async onSubmit(form: FormGroup): Promise<void>{
        if(form.get('storeId').value === null && this.state.userType === 'Seller') {
          this.popOverService.showPopUp('Create A Store First');
        } else {
            try {
                if(this.state.actionType === 'add'){
                    const product = await this.endpoint.addProduct(form.value, this.storeDataService.storeRequestStateUpdater);
                    this.dataService.productForm.get('id').patchValue(product.id);
                    this.setState({
                      ...this.state,
                      actionType: 'update',
                      sellerBtnName: 'Update',
                    });
                    this.popOverService.showPopUp(`Succesfully Added ${product.name}`);
                } else {
                    const product = await this.endpoint.updateProduct(form.value, this.storeDataService.storeRequestStateUpdater);
                    this.popOverService.showPopUp(`Succesfully Updated ${product.name}`);
                }
            } catch (error) {
              this.popOverService.showPopUp('Something went wrong!!!');
            }
        }
    }
    onBackBtn(): void{
      if(this.state.storeId !== null || this.state.storeName !== null) {
        this.router.navigateByUrl(`products/store-list/store/${this.state.storeId}/${this.state.storeName}`);
      } else {
        this.router.navigateByUrl('products');
      }
    }
    async onDelete(): Promise<void>{
      try {
        const product = await this.endpoint.updateProductStatus(
                          {productId: this.state.productId, status: ProductStatus.INARCHIEVE},
                          this.storeDataService.storeRequestStateUpdater
                        );
        this.router.navigateByUrl('products');
        this.popOverService.showPopUp('Deleted Product');
      } catch (error) {
        this.popOverService.showPopUp('Something went wrong!!!');
      }
    }
    async onAddToCart(form: FormGroup): Promise<void>{
      if(form.get('quantity').value === null){
        this.popOverService.showPopUp('Enter Quanity');
      } else {
        try {
          const cart    = await this.endpoint.addToCart(form.value, this.storeDataService.storeRequestStateUpdater);
          this.getStoreProduct();
          this.dataService.productForm.get('quantity').patchValue(null);
          this.popOverService.showPopUp(`Added ${cart.name} To Cart`);
        } catch (error) {
          this.popOverService.showPopUp('Something went wrong!!!');
        }
      }
    }
    async getSellerCategory(): Promise<void>{
      try {
          const userMeta: UserMeta[] = await this.globalEndpoint.selectUserMetaByUserIdAndMetaKey(
                                       {userId: this.state.loginUserId, metaKey: MetaKey.SELLERPRODUCTCATEGORY},
                                       this.storeDataService.storeRequestStateUpdater
                                       );
          const categories = [];
          userMeta.forEach(element => {
            categories.push(element.meta_value);
          });
          this.setState({
            ...this.state,
            categories
          });
      } catch (error) {
      }
    }
}
