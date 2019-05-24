import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { MOCK_PRODUCTS } from '../mock/MOCK_PRODUCT';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { errorHandler } from '@angular/platform-browser/src/browser';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }) }


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private url= 'api/products';

  constructor( private http:HttpClient ) { }

  get():Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  getNextProduct(id):Observable<Product[]>{
    return this.http.get<Product[]>(this.url).pipe(map(products => products.filter(prods => prods.id != id)), catchError(this.handleError<Product[]>('product')));
  }
  update(product: Product){
    return this.http.put(this.url, product, httpOptions);
  } 

  private handleError<T> (operation:string, result?: T) {
    return (error: any): Observable<T> => {
   
      console.error(error); // log to console instead
   
      return of(result as T);
    };
  }
  
}
