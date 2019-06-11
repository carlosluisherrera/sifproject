import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }) }

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url = 'api/users';

  constructor( private http:HttpClient ) { }

  getUser(id:string): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`);
  }
  create(user: User): Observable<User>{
    return this.http.post<User>(this.url, user, httpOptions);
  }
  update(user: User): Observable<any>{
    return this.http.put<User>(this.url, user, httpOptions);
  }  
  delete(user: User | number ): Observable<User>{
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<User>(url, httpOptions);
  }
  get():Observable<User[]>{
    return this.http.get<User[]>(this.url, httpOptions);
  }
  login(user: string, pass: string){
    return this.http.get<User[]>(this.url).pipe(map(users=> users.filter(u=>u.nickname===user && u.password===pass)));
  } 

}
