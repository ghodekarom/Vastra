package com.vastra.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {

    private String id;
    private String productId;
    private String name;
    private String slug;
    private String color;
    private String size;
    private int quantity;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private String image;
    private String sku;
}
