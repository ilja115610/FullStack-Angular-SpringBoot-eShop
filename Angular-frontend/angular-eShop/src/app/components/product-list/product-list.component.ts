import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  category_name: string;
  searchMode: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

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
    this.productService.getProductList(this.currentCategoryId).subscribe(data=> {
      this.products = data;
    });
  }

  private handleSearchProducts() {

    const keyWord: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProduct(keyWord).subscribe(
      data=>{
        this.products = data;
      }
    )
  };
}
