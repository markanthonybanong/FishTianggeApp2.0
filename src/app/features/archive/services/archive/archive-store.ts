import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService, StoreDataService } from '@fish-tiangge/shared/data-service';
import { ProductStatus } from '@fish-tiangge/shared/enums';
import { getStoreRequestStateUpdater } from '@fish-tiangge/shared/helpers';
import { ImageService, PopOverService } from '@fish-tiangge/shared/services';
import { Store } from 'rxjs-observable-store';
import { setProductForm } from '../../helpers/set-product-form';
import { ArchiveEndpoint } from './archive-endpoint';
import { ArchiveStoreState } from './archive-store-state';

@Injectable()
export class ArchiveStore extends Store<ArchiveStoreState> {
    constructor(
        private storeDataService: StoreDataService,
        private router: Router,
        private endpoint: ArchiveEndpoint,
        private productDataService: ProductDataService,
        private imageService: ImageService,
        private popOverService: PopOverService
    ){
        super(new ArchiveStoreState());
    }

    init(): void{
        this.storeDataService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.getProduct();
    }
    onBack(): void{
        this.router.navigateByUrl('archive');
    }
    async getProduct(): Promise<void>{
        try {
            const product = await this.endpoint.getProduct(
                                {productId: this.state.productId},
                                this.storeDataService.storeRequestStateUpdater
                            );
            const image   = product.img !== null ? this.imageService.safePhotoURL(product.img) : null;
            this.productDataService.productForm.get('imgForDisplay').patchValue(image);
            setProductForm(product, this.productDataService.productForm);
        } catch (error) {
        }
    }
    async onRestore(): Promise<void> {
        try {
            await this.endpoint.updateProductStatus(
                {productId: this.state.productId, status: ProductStatus.INSTORE},
                this.storeDataService.storeRequestStateUpdater,
            );
            this.router.navigateByUrl('archive');
            this.popOverService.showPopUp('Product Restore');
        } catch (error) {
            this.popOverService.showPopUp('Something went wrong!!!');
        }
   }
   async onDeletePermanently(): Promise<void> {
    try {
        await this.endpoint.deleteProduct(this.state.productId, this.storeDataService.storeRequestStateUpdater);
        this.router.navigateByUrl('archive');
        this.popOverService.showPopUp('Product deleted permanently');
    } catch (error) {
        this.popOverService.showPopUp('Something went wrong!!!');
    }
   }
}

