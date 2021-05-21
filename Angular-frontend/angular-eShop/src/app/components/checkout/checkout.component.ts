import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditCardService} from '../../services/credit-card.service';
import {FormService} from '../../services/form.service';
import {Country} from '../../common/country';
import {State} from '../../common/state';
import {CartService} from "../../services/cart.service";
import {CheckoutService} from '../../services/checkout.service';
import {Router} from '@angular/router';
import {Order} from '../../common/order';
import {OrderItem} from '../../common/order-item';
import {Purchase} from '../../common/purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  creditCardYears: number [] = [];

  creditCardMonths: number [] = [];

  countries: Country [] = [];

  shippingAddressStates: State [] = [];

  billingAddressStates : State [] = [];

  totalPrice : number = 0;

  totalQty: number = 0;

  constructor(private formBuilder: FormBuilder, private creditCardService: CreditCardService, private formService: FormService
    ,private cartService : CartService, private checkoutService: CheckoutService, private router: Router) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required, Validators.minLength(2)]) ,
        lastName: new FormControl('',[Validators.required,Validators.minLength(2)]),
        email: new FormControl('',[Validators.required,
          Validators.pattern('[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}')]
        )
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required, Validators.minLength(2)]),
        city: new FormControl('',[Validators.required, Validators.minLength(2)]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipcode: new FormControl('',[Validators.required, Validators.minLength(2)])
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[Validators.required]),
        nameOnCard: new FormControl('',[Validators.required, Validators.minLength(2)]),
        cardNumber: new FormControl('',[Validators.required, Validators.minLength(16)]),
        securityCode: new FormControl('',[Validators.required, Validators.minLength(3)]),
        expirationMonth: new FormControl(new Date().getMonth(),[Validators.required]),
        expirationYear: new FormControl(new Date().getFullYear(),[Validators.required])
      })
    });

    this.populateMonths();

    this.populateYears();

    this.populateCountries();

    this.reviewCartDetails();

    }

  onSubmit() {
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    console.log(this.checkoutFormGroup.controls['creditCard'].get('expirationYear').value)
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQty;

    const cartItems = this.cartService.cartItems;

    let orderItems : OrderItem[] = [];

    cartItems.forEach(item=>{
      orderItems.push(new OrderItem(item))
    })

    let purchase = new Purchase();

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state))
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country))
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;


    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state))
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country))
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe({
      next: response=>{alert('Order: '+`${response.orderTrackingNumber}`)
      this.resetCart()},
      error: err => alert('Error: '+err.message)
    })

  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQty.next(0);
    this.checkoutFormGroup.reset();

    this.router.navigateByUrl('/products');
  }


  get shippingAddressStreet () {

    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity () {

    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState () {

    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressCountry () {

    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get shippingAddressZipCode () {

    return this.checkoutFormGroup.get('shippingAddress.zipcode');
  }


  get firstName () {

    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName () {

    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email () {

    return this.checkoutFormGroup.get('customer.email');
  }

  getStates (formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;

    this.formService.populateStatesByCountry(countryCode).subscribe(
      data=> {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }
        formGroup.get('state').setValue(data[0])
      }
    )


  }

  copyAddress (event) {

    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  populateCountries () {

    this.formService.populateCountries().subscribe(
      data=>this.countries = data
    );
  }

  populateYears () {

    this.creditCardService.getCreditCardYears().subscribe(
      data=>this.creditCardYears = data
    );

  }

  populateMonths () {

    const startMonths = new Date().getMonth() + 1;

    this.creditCardService.getCreditCardMonths(startMonths).subscribe(
      data=>this.creditCardMonths = data
    );

  }


  private reviewCartDetails() {

    this.cartService.totalQty.subscribe(
      data=>this.totalQty = data
    );

    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice = data
    );
  }
}
