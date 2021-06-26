import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartDataService {
    public totals: number = 0;
    public paymentType: string = null;
    constructor(){}
 
}

