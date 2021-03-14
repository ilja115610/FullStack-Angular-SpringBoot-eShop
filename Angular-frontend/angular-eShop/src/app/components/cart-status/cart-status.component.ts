import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.0;
  totalQty: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  private updateCartStatus() {

    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice = data
    );
    this.cartService.totalQty.subscribe(
      data=>this.totalQty = data
    );
  }

}
