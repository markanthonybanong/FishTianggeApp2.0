import { Injectable } from '@angular/core';
import { Store } from '../types';


@Injectable({
  providedIn: 'root'
})
export class StoreListDataService {
  public searchStores: Array<Store>;
  constructor() { }
}
