package com.vastra.checkout.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingQuoteResponseDto {
    private BigDecimal shippingFee;
    private boolean freeShipping;
    private BigDecimal freeShippingThreshold;
    private BigDecimal amountNeededForFreeShipping;
    private String estimatedDelivery;
    private String courierPartner;
}
