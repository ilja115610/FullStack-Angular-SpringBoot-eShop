import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreditCardService} from '../../services/credit-card.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  creditCardYears: number [] = [];

  creditCardMonths: number [] = [];

  constructor(private formBuilder: FormBuilder, private creditCardService: CreditCardService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.populateMonths();

    this.populateYears();


    }

  onSubmit() {
    console.log(this.checkoutFormGroup.getRawValue());
  }

  copyAddress (event) {

    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
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


}
