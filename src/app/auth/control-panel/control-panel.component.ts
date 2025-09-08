import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  public innerHeight:any;
  users:User[];
  usersToUpdate:User[]=[];

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  constructor( private ngZone: NgZone, private userService:UserService ) { }

  ngOnInit(): void {    
    this.innerHeight = window.innerHeight;
    this.getUsers();
    window.onresize = (e) =>
      {
          this.ngZone.run(() => {
              this.innerHeight = window.innerHeight;
          });
      };
  
  }

  getContentSize():number{
    return this.innerHeight-66;
  }

  getUsers():void{
    this.userService.get().subscribe(users=>{this.users = users})
  }

  updateUser(user:User, level:number){
    user.level=level;
    this.usersToUpdate.push(user);
  }

  saveChanges(){
    for (let i = 0; i < this.usersToUpdate.length; i++) {
      let user=this.usersToUpdate[i];
      this.userService.update(user).subscribe(res=> console.log(`${user} updated`));
    }
    this.usersToUpdate=[];
  }

}
