import { Component, OnInit, NgZone } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  public innerHeight:any;
  faTimes=faTimes;

  constructor(private ngZone:NgZone) { }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    window.onresize = (e) =>
      {
          this.ngZone.run(() => {
              this.innerHeight = window.innerHeight;
          });
      };
  }

  getRowHeight():number{
    return this.innerHeight-66;
  }

}
