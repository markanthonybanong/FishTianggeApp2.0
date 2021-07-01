import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@fish-tiangge/shared/services';

@Injectable()

export class AppStore{
    public loginUserName = null;
    constructor(
        private storageService: StorageService,
        private router: Router,
    ){
       this.displayLoginUser();
    }
    async displayLoginUser(): Promise<void> {
       const user: any = await this.storageService.get('loginUser');
       if(user !== undefined) {
            this.loginUserName = user.userName;
       }
    }
    onProducts(): void{
        this.router.navigateByUrl('products');
    }
    onOrders(): void{
        this.router.navigateByUrl('orders');
    }
    async onLogOut(): Promise<void> {
        await this.storageService.clear();
        this.router.navigateByUrl('login');
    }
}
