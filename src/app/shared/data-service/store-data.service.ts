import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from '../types';

@Injectable({
    providedIn: 'root',
})

export class StoreDataService{
    public warningMsg = null;
    public storeRequestStateUpdater: StoreRequestStateUpdater = null;
    public logInUserId = null;

    constructor() {}

}