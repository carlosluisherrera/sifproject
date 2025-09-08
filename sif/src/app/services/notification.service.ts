import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private subject = new Subject<string>();
 
  add(message: string) {
    this.subject.next(message);
  }

  getNotification(): Observable<any> {
    return this.subject.asObservable();
}
 
  clear() {
    this.subject.next();
  }
}
