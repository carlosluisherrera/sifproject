import { Component, OnInit, NgZone } from '@angular/core';
import { Product } from '../../model/product';
import { faGlobe, faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import { faCheckCircle, faCheckSquare, faClipboardList, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { ProductControl } from 'src/app/model/product_control';
import { ProductControlService } from 'src/app/services/product-control.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  products: Product[];
  for_revision_products:Product[];
  for_approval_products:Product[];
  for_approval: number;
  for_revision: number;
  active:number = 0;
  footer_active: number = 0;
  faGlobe=faGlobe;
  faExclamationCircle=faExclamationCircle;
  faInfoCircle=faInfoCircle;
  public innerHeight: any;
  selectedCategory:string='all';
  selectedPhase:string='revision';
  faCheckCircle=faCheckCircle;
  faCheckSquare=faCheckSquare;
  faClipboardList=faClipboardList;
  faClipboardCheck=faClipboardCheck;
  productControl:ProductControl[]=[];
  isAdmin:boolean;
  boxesChecked:boolean;

  constructor( private userService:UserService, private productControlService: ProductControlService, private productService: ProductService, private ngZone:NgZone ) { }

  ngOnInit() {
    this.setIsAdmin();
    this.getProducts();
    this.innerHeight = window.innerHeight;
    window.onresize = (e) =>
      {
          this.ngZone.run(() => {
              this.innerHeight = window.innerHeight;
          });
      };   
  }

  checkBox():void{
    for(let i=0; i<this.for_approval; i++){
      let product=this.for_approval_products[i];
      if(product.approved){
        this.boxesChecked=true;
        break;
      }
      else{
        this.boxesChecked=false;
      }
    }
  }

  setIsAdmin():void{
    this.userService.getUser(localStorage.getItem('user')).subscribe(user=>{user.level==2 ? this.isAdmin = true : this.isAdmin = false});
  }

  toggleActive(index:number):void{
    this.active = index;
    this.selectedPhase = (this.active === 0) ? 'revision' : 'approval';
   }

   getProducts():void{
    this.productService.get().subscribe(products => {
      this.for_revision_products=products.filter(prod=>prod.phase===1);
      this.for_approval_products=products.filter(prod=>prod.phase===2);

      this.for_revision=this.for_revision_products.length;
      this.for_approval=this.for_approval_products.length;
    });
   }

  toggleFooterActive(index:number):void{
    this.footer_active = index;
  }

  getTableHeight():number{
    const adminWeight= this.isAdmin ? 0 : 42;
    return this.innerHeight-175+adminWeight;
  }

  changeCategory(category:string){
    this.selectedCategory=category;
  }

  toggleSelectedPhase(phase: string){
    this.selectedPhase=phase;
  }

  toggleApproved(product: Product, value: boolean){
    product.approved=value;
    this.productService.update(product).subscribe(res => {this.checkBox()});
  }

  getBgColor(color:number){
    if(color==0){
      return 'rgba(255, 215, 161, 0.43)';
    }
    else if(color>0){
      return 'rgba(44, 171, 215, 0.5)';
    }
    else{
      return 'rgba(220, 53, 69, 0.6)';
    }
  }
  sendData(){
    for(let i=0; i< this.for_approval_products.length; i++){
      let product=this.for_approval_products[i];
      if(product.approved){
        this.productControl.push(
          {
            product_code: product.code,
            product_barcode: product.barcode,
            product_quantity: product.quantity,
            product_quantity_on_system: product.quantity_on_system,
            quantity_difference: product.quantity_difference,
            checked: product.checked,
            checked_time: product.checked_time
          } as ProductControl
        );
      }
    }
    let result=JSON.stringify(this.productControl);
    console.log(result);
    this.productControlService.send(result);
  }  
}
