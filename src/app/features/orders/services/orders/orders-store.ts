import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class OrdersStore {
    constructor(
        private router: Router
    ){}
    onSegmentChanged($event: any): void{
        if ($event.detail.value === 'orderList') {
            this.router.navigateByUrl('orders/order-list');
        }else {
            this.router.navigateByUrl('orders/order-history-list');
        }
    }
}
