import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@fish-tiangge/shared/services';

@Injectable()

export class AppStore{
    userType: string = null;
    loginUser: string = null;
    public productsLabel: string = null;
    constructor(
        private storageService: StorageService,
        private router: Router,
    ){

    }
}
