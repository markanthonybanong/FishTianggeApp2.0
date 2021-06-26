import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  public labelName:string     = null;
  public value:string         = null; 
  public segmentValue: string = null;
  constructor() { }
}
