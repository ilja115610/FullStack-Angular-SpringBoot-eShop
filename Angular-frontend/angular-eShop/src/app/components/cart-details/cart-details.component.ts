import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number;
  totalQty: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartItems();

  }


  listCartItems () {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice = data
    );
    this.cartService.totalQty.subscribe(
      data=>this.totalQty = data
    );
    this.cartService.computeCartTotals();
  }

}
