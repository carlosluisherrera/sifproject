import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public innerHeight: any;
  public innerWidth: any;
  isValid:boolean=false;
  user:User;
  errors:string[]=[];
  
  constructor(private ngZone:NgZone, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user')) 
    {this.router.navigate(['/inventory-list']);}
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

  checkValid(user: string, pass: string):void{
    if((user.length>7) && (pass.length>7) && (/^[a-zA-Z0-9_.-]*$/.test(user)==true)){
      this.isValid=true;
    }
    else{
      this.isValid=false;
    }    
  }

  getRowHeight():number{
    return this.innerHeight;
  }
  getMargin():number{
    return (this.innerHeight-500)/2;
  }
  login(user:string, pass: string){
    this.errors=[];
    user=user.substr(0,20).trim();
    pass=pass.substr(0,20).trim();
    this.userService.login(user,pass).subscribe(users=>
      {
        if(users[0]) {
          this.user=users[0];
          localStorage.setItem('user', `${this.user.id}`);
          this.router.navigate(['/inventory-list']);
        } else 
            this.errors.push('Usuario o contraseña incorrectos')
      });
  } 

}
