package com.vastra.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto {

    private String id;
    private String slug;
    private String name;
    private String subtitle;
    private String description;
    private String category;
    private String collection;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private int discountPercentage;
    private BigDecimal rating;
    private int reviewCount;
    private List<String> badges;
    private List<ColorOptionDto> colors;
    private List<String> sizes;
    private List<String> images;
    private String fabric;
    private int gsm;
    private String fit;
    private String modelInfo;
    private List<String> careInstructions;
    private Map<String, String> specifications;
    private boolean isNew;
    private boolean isBestseller;
    private boolean isSale;
    private boolean featured;
    private List<ProductVariantDto> variants;
}
