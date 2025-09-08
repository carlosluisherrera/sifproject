import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductControlService {

  constructor( private http: HttpClient, private messageService:NotificationService ) { }

  url='api/product-control'

  send(data:string, columns:number):Observable<any>{
    return this.http.post<any>(this.url, data).pipe(tap(_=>{this.messageService.add(`Se han enviado ${columns} entradas`)}));
  }
}
