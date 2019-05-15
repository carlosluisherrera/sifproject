import { Component, OnInit, NgZone } from '@angular/core';
import { Product } from '../../model/product';
import { faGlobe, faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  products$: Observable<Product[]>;
  products: Product[];
  for_approval: number = 1;
  for_revision: number = 10;
  active:number = 0;
  footer_active: number = 0;
  faGlobe=faGlobe;
  faExclamationCircle=faExclamationCircle;
  faInfoCircle=faInfoCircle;
  public innerHeight: any;

  constructor( private productService: ProductService, private ngZone:NgZone ) { }

  ngOnInit() {
    this.productService.get().subscribe(products => this.products = products);
    this.innerHeight = window.innerHeight;
    window.onresize = (e) =>
      {
          this.ngZone.run(() => {
              this.innerHeight = window.innerHeight;
          });
      };   
  }

  toggleActive(index:number):void{
    this.active = index;
  }

  toggleFooterActive(index:number):void{
    this.footer_active = index;
  }

  getTableHeight():number{
    return this.innerHeight-175;
  }

}
