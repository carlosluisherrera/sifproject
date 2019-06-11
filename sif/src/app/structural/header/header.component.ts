import { Component, OnInit } from '@angular/core';
import { faSearch, faUser, faCaretDown, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'sif';
  faSearch=faSearch;
  faUser=faUser;
  faCaretDown=faCaretDown;
  faBarcode=faBarcode;
  isAdmin=false;
  pageName:string;
  

  constructor( private userService:UserService, private router:Router, private route:ActivatedRoute ) { }

  ngOnInit() {
    this.determineIfIsAdmin();
    this.setPageName();
  }

  determineIfIsAdmin(){
    this.userService.getUser(localStorage.getItem('user')).subscribe(user=>{ user.level==2 ? this.isAdmin=true : this.isAdmin=false });
  }

  setPageName():void{
    this.route.url.subscribe(url=>{
      const path=url[0].path;
      switch (path) {
        case 'control-panel':
          this.pageName='Panel de control'; 
          break;
      
        default:
          this.pageName='Inventario';
          break;
      }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
