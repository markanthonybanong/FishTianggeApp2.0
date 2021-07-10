import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class DeliveriesStore{
    constructor(
        private router: Router
    ){}
    onSegmentChanged($event: any): void{
        if($event.detail.value === 'deliverList'){
            this.router.navigateByUrl('deliveries');
        } else {
            this.router.navigateByUrl('deliveries/deliver-history-list');
        }
    }
}
