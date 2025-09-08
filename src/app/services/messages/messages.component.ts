import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public message:string;

  constructor( public messageService:NotificationService ) { 
    
   }

  ngOnInit() {
    this.messageService.getNotification().subscribe(notification=>{
      this.message=notification;
      setTimeout(_=>{this.message=null}, 3000);
    });
  }

  getMessage():void{
    
  }

}
