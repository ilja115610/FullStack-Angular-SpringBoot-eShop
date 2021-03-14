import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem [] = [];

  totalPrice: Subject<number> = new Subject<number>();

  totalQty: Subject<number> = new Subject<number>();

  constructor() {
  }

  addToCart(theCartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      alreadyExistsInCart = (existingCartItem!=undefined);
    }

      if (alreadyExistsInCart) {
        existingCartItem.quantity++;
      } else {
        this.cartItems.push(theCartItem);
      }

      this.computeCartTotals();



  }

  private computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQtyValue: number = 0;

    for (let tempItem of this.cartItems) {
        totalPriceValue+=tempItem.unitPrice;
        totalQtyValue += tempItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQty.next(totalQtyValue);

    console.log(`Total items: ${totalQtyValue} Total price: ${totalPriceValue}`);
  }
}
