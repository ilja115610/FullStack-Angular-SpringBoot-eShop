package com.backend.ecommerce.service;

import com.backend.ecommerce.DTO.Purchase;
import com.backend.ecommerce.DTO.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder (Purchase purchase);
}
