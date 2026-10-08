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
public class ShippingQuoteRequestDto {
    private BigDecimal subtotal;
    private String shippingMethod; // STANDARD, EXPRESS
    private String pincode;
}
