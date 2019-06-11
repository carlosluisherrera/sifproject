import { Injectable } from '@angular/core';
import { ProductControl } from 'src/app/model/product_control';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductControlService {

  constructor( private http: HttpClient ) { }

  url='api/product-control'

  send(data:string):Observable<any>{
    return this.http.post<any>(this.url, data);
  }
}
