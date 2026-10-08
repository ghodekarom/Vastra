package com.vastra.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartSummaryDto {

    private List<CartItemDto> items;
    private BigDecimal subtotal;
    private BigDecimal discountAmount;
    private BigDecimal shippingFee;
    private BigDecimal total;
    private boolean isFreeShippingEligible;
    private BigDecimal freeShippingThreshold;
    private BigDecimal amountNeededForFreeShipping;
    private String activeCoupon;
}
