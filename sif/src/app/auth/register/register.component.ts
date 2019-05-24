import { Component, OnInit, NgZone } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from 'src/app/services/user.service';
import {Router} from "@angular/router"
import { EventEmitter } from 'events';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public innerHeight: any;
  public innerWidth: any;
  isValid:boolean;
  public user: User;
  errors:string[]=[];

  constructor(private ngZone:NgZone, private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    window.onresize = (e) =>
      {
          this.ngZone.run(() => {
              this.innerHeight = window.innerHeight;
              this.innerWidth = window.innerWidth;
          });
      };
  }
  getRowHeight():number{
    return this.innerHeight;
  }
  getMargin():number{
    return (this.innerHeight-500)/2;  
  }

  checkValid(user: string, pass: string, pass_confirm:string, name: string):void{
    if((user.length>7) && (pass.length>7) && (pass_confirm.length>7) && (name.length>7) ){
      this.isValid=true;
    }
    else{
      this.isValid=false;
    }
  }
  validateInfo(name:string, user:string, pass: string, pass_confirm:string):any{
    this.errors=[];
    if (pass!=pass_confirm){
      this.errors.push('La contraseña introducida no coincide con la confirmación')
    }
    if(this.errors.length===0)
    this.user = { nickname:user, password: pass, full_name: name, level:1 } as User;
  }
  register(name:string, user:string, pass: string, pass_confirm:string):void{
    this.validateInfo(name, user, pass, pass_confirm);
    if (this.user) 
      { 
        this.userService.create(this.user).subscribe(user => {this.router.navigate(['/login'])}) 
      }
  }


  
}
