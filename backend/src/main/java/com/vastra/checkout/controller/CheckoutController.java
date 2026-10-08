package com.vastra.checkout.controller;

import com.vastra.checkout.dto.ShippingQuoteRequestDto;
import com.vastra.checkout.dto.ShippingQuoteResponseDto;
import com.vastra.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/checkout")
@RequiredArgsConstructor
@Tag(name = "Checkout", description = "Checkout Sessions and Authoritative Shipping Calculation")
public class CheckoutController {

    @Value("${vastra.commerce.free-shipping-threshold:1999.00}")
    private BigDecimal freeShippingThreshold;

    @Value("${vastra.commerce.standard-shipping-fee:99.00}")
    private BigDecimal standardShippingFee;

    @Value("${vastra.commerce.express-shipping-fee:199.00}")
    private BigDecimal expressShippingFee;

    @PostMapping("/quote")
    @Operation(summary = "Calculate authoritative delivery fee, free shipping progress, and delivery estimation")
    public ResponseEntity<ApiResponse<ShippingQuoteResponseDto>> getShippingQuote(
            @RequestBody ShippingQuoteRequestDto request
    ) {
        BigDecimal subtotal = request.getSubtotal() != null ? request.getSubtotal() : BigDecimal.ZERO;
        String method = request.getShippingMethod() != null ? request.getShippingMethod().toUpperCase() : "STANDARD";

        BigDecimal fee;
        boolean isFree = false;

        if ("EXPRESS".equals(method)) {
            fee = expressShippingFee;
        } else {
            if (subtotal.compareTo(freeShippingThreshold) >= 0) {
                fee = BigDecimal.ZERO;
                isFree = true;
            } else {
                fee = standardShippingFee;
            }
        }

        BigDecimal needed = freeShippingThreshold.subtract(subtotal);
        if (needed.compareTo(BigDecimal.ZERO) < 0) {
            needed = BigDecimal.ZERO;
        }

        String deliveryEst = "EXPRESS".equals(method) ? "1–2 Business Days" : "3–5 Business Days";

        ShippingQuoteResponseDto response = ShippingQuoteResponseDto.builder()
                .shippingFee(fee)
                .freeShipping(isFree)
                .freeShippingThreshold(freeShippingThreshold)
                .amountNeededForFreeShipping(needed)
                .estimatedDelivery(deliveryEst)
                .courierPartner("BlueDart Express")
                .build();

        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
