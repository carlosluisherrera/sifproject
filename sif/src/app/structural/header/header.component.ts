import { Component, OnInit } from '@angular/core';
import { faSearch, faUser, faCaretDown, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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
  

  constructor( private router:Router ) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
