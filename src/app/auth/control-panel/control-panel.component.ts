import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  public innerHeight:any;
  users:User[];
  usersToUpdate:User[]=[];
  // If you need to reference the scrollbar, use:
  // @ViewChild(NgScrollbar) scrollbar?: NgScrollbar;

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
