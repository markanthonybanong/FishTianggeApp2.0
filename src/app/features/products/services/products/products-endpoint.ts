import { Injectable } from '@angular/core';
import { ApiService } from '@fish-tiangge/shared/services';

@Injectable()
export class ProductsEndpoint{
    constructor(private apiService: ApiService){}

}
