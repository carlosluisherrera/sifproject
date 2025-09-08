import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private titleService: Title, private route:ActivatedRoute ){}

  ngOnInit(){
    this.setTitle();
  }

  setTitle(){
    this.route.url.subscribe(url=>{
      const path=url[0].path;
      let title='';
      switch (path) {
        case 'control-panel':
          title='SIF | PANEL DE CONTROL';
          break;
      
        default:
          title='SIF'
          break;
      }
      console.log(path);
      this.titleService.setTitle(title);
    })
  }

}
