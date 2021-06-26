import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from '../types';

@Injectable({
    providedIn: 'root',
})

export class StoreDataService{
    constructor() {}
    public warningMsg = null;
    public storeRequestStateUpdater: StoreRequestStateUpdater = null;
    public logInUserId = null;
}