import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';
@Injectable()

export class DeliverLocationEndpoint{
    constructor(private apiService: ApiService){}
}
