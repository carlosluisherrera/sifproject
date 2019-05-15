import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { MOCK_PRODUCTS } from '../mock/MOCK_PRODUCT';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  get():Observable<Product[]>{
    return of(MOCK_PRODUCTS);
  }
}
