package com.vastra.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantDto {

    private String id;
    private String colorName;
    private String colorHex;
    private String size;
    private String sku;
    private BigDecimal price;
    private int stock;
    private String image;
}
