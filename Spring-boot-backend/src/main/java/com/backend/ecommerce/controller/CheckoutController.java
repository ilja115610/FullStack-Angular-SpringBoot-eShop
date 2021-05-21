package com.backend.ecommerce.controller;

import com.backend.ecommerce.DTO.Purchase;
import com.backend.ecommerce.DTO.PurchaseResponse;
import com.backend.ecommerce.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder (@RequestBody Purchase purchase){

        return checkoutService.placeOrder(purchase);
    }
}
