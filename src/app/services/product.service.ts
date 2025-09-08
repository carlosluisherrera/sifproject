import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { faSmileBeam } from '@fortawesome/free-solid-svg-icons';

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

  getNextProduct(id:number, category:string, phase: number):Observable<Product[]>{
    return this.http.get<Product[]>(this.url).pipe(map(products => products.filter(prods => prods.id != id && prods.phase == phase && prods.approved!=true)), catchError(this.handleError<Product[]>('product')));
  }
  update(product: Product){
    return this.http.put(this.url, product, httpOptions);
  } 

  searchProduct(term: string): Observable<Product[]> {
    if (!term.trim()) {      
      return of([]);
    }
    return this.http.get<Product[]>(`${this.url}`).pipe(
      map(products=> products.filter(prods => prods.description.includes(term.toUpperCase()) || prods.barcode.includes(term))),
      catchError(this.handleError<Product[]>('searchProduct', []))
    );
  }
  resetProducts(products: Product[]):Observable<any>{
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.approved=false;
      product.checked=false;
      product.checked_by=null;
      product.checked_time=null;
      product.last_counting_date=new Date().toLocaleString();
      product.phase=1;
      if(i == products.length-1)
      {
        return this.update(product); 
      }
      else{
        this.update(product).subscribe();
      }
    }
  }

  private handleError<T> (operation:string, result?: T) {
    return (error: any): Observable<T> => {
   
      console.error(error); // log to console instead
   
      return of(result as T);
    };
  }
  
}
