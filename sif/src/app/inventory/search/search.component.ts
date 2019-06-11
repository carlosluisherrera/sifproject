import { Component, OnInit, NgZone } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, from } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  innerHeight: number;
  results$: Observable<Product[]>;
  faSearch = faSearch;
  private searchTerms = new Subject<string>();

  constructor( private ngZone: NgZone, private productService: ProductService ) { }

  ngOnInit(): void {    
    this.innerHeight = window.innerHeight;
    window.onresize = (e) =>
      {
          this.ngZone.run(() => {
              this.innerHeight = window.innerHeight;
          });
      };
      
      this.results$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.productService.searchProduct(term)),
      );  
  }

  getContentSize():number{
    return this.innerHeight-66;
  }

  getResultContainerSize():number{
    return this.innerHeight-220;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }



}
