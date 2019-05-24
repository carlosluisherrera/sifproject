import { Component, OnInit, NgZone } from '@angular/core';
import { faTimes, faCheckCircle, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  public innerHeight:any;
  faTimes=faTimes;
  faCheckCircle=faCheckCircle;
  faStopwatch=faStopwatch;
  isChecked:boolean;
  product: Product;
  products: Product[];
  nextProduct: Product;
  id:number;

  constructor(private ngZone:NgZone, private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.isChecked=false;
    this.innerHeight = window.innerHeight;
    window.onresize = (e) =>
      {
          this.ngZone.run(() => {
              this.innerHeight = window.innerHeight;
          });
      };
      this.getProduct();
      this.getNextProduct();
  }

  getRowHeight():number{
    return this.innerHeight-66;
  }

  toggleIsChecked():void{
    this.isChecked == false ? this.isChecked = true : this.isChecked = false;
  }

  getProduct(): void {
    this.route.params.subscribe(params=>{ this.productService.getProduct(params.id)
      .subscribe(product => this.product = product); });  
  }

  getProducts(): void{
    this.productService.get().subscribe(products => this.products = products);
  }

  getNextProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const category = this.route.snapshot.paramMap.get('category');
    const phase = +this.route.snapshot.paramMap.get('phase');

    this.route.params.subscribe(params=>{ 
      this.productService.getNextProduct(params.id).subscribe(products => {this.nextProduct = products[0]});
     })
    
  }
  complete(quantity:number){
    this.product.quantity=quantity;
    this.product.phase=1;
    this.productService.update(this.product).subscribe(product=>{
      this.router.navigate([`product/${this.nextProduct.id}`])
    });
  }
  omit(){
    this.router.navigate([`product/${this.nextProduct.id}`]);
  }    
}
