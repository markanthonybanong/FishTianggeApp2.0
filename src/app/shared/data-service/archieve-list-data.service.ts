import { Injectable } from '@angular/core';
import { Product } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ArchieveListDataService {
  public searchProducts: Array<Product>;
  constructor() { }
}
