import { Component, OnInit, NgZone } from '@angular/core';
import { faTimes, faCheckCircle, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
  nextUrl:string;
  tourEnded:boolean;
  currentUser:string;
  public now:Date = new Date();
  isApproval:boolean;

  constructor(private userService:UserService, private ngZone:NgZone, private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

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
      this.getCurrentUser();
  }

  getRowHeight():number{
    return this.innerHeight-66;
  }

  getCurrentUser(){
    this.userService.getUser(localStorage.getItem('user')).subscribe(user=>this.currentUser=user.full_name);
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
    this.route.params.subscribe(params=>{ 
      const phase = (params.phase == 'revision') ? 1 : 2;
      this.isApproval = (phase == 2 ) ? true : false; 
      this.productService.getNextProduct(params.id, params.category, phase).subscribe(products => {
        if (products[0]) {
          this.nextProduct = products[0];
          this.nextUrl = `${params.phase}/${params.category}/${this.nextProduct.id}`;
        }
        else this.nextUrl=null;               
      });
     })
    
  }
  revise(quantity:number){
    this.product.quantity=quantity;
    this.product.checked=true;
    this.product.checked_by=this.currentUser;
    this.product.quantity_difference=this.product.quantity-this.product.quantity_on_system;
    this.product.checked_time=this.now.toLocaleString();
    this.product.phase=2;
    this.productService.update(this.product).subscribe(product=>{
      if (this.nextUrl){
        this.router.navigate([this.nextUrl]);
      }
      else{
        this.tourEnded=true;
      }      
    });
  }
  approve(quantity:number){
    if(quantity!=this.product.quantity){
      this.product.quantity=quantity;
      this.product.checked_by=this.currentUser;
      this.product.quantity_difference=this.product.quantity-this.product.quantity_on_system;
      this.product.checked_time=this.now.toLocaleString();
    }
    this.product.approved=true;
    this.productService.update(this.product).subscribe(product=>{
      if (this.nextUrl){
        this.router.navigate([this.nextUrl]);
      }
      else{
        this.tourEnded=true;
      }      
    });
  }
  omit(){
    this.router.navigate([this.nextUrl]);
  }    
}
