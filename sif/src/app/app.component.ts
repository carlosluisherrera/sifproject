import { Component } from '@angular/core';
import { faSearch, faUser, faCaretDown, faBarcode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sif';
  faSearch=faSearch;
  faUser=faUser;
  faCaretDown=faCaretDown;
  faBarcode=faBarcode;
}
