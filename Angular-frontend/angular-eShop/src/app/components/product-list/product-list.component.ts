import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  category_name: string;
  searchMode: boolean = false;

  thePageNumber: number;
  thePageSize: number;
  theTotalElements: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });

  }

  listProducts () {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }

    else {
      this.handleListProducts();
    }
  }

  handleListProducts () {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.category_name = this.route.snapshot.paramMap.get('category_name');
    }
    else {
      this.currentCategoryId = 1;
      this.category_name = 'Books';
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1
      ,this.thePageSize,this.currentCategoryId).subscribe(this.processResult())

  }

  private handleSearchProducts() {

    const keyWord: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProduct(keyWord).subscribe(
      data=>{
        this.products = data;
      }
    )
  };

  private processResult() {
    return data=> {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number +1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }

  }

  addToCart(theProduct: Product){

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);


  }
}
