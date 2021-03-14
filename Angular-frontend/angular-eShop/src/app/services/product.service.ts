import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';


  constructor( private httpClient: HttpClient) { }

  getProductListPaginate(thePage: number,thePageSize: number,theCategoryId: number
                         ): Observable<GetResponseProduct> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      +`&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl)
  };


  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response=>response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    );
  }

  searchProduct(keyWord: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyWord}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response=>response._embedded.products)
    );

  }

  getProduct(productId: number): Observable<Product> {

    const url = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(url).pipe(
      map(response=>response)
    )
  };
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}


