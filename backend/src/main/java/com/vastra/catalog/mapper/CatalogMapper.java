package com.vastra.catalog.mapper;

import com.vastra.catalog.dto.CollectionResponseDto;
import com.vastra.catalog.dto.ColorOptionDto;
import com.vastra.catalog.dto.ProductResponseDto;
import com.vastra.catalog.dto.ProductVariantDto;
import com.vastra.catalog.entity.Category;
import com.vastra.catalog.entity.Collection;
import com.vastra.catalog.entity.Product;
import com.vastra.catalog.entity.ProductCareInstruction;
import com.vastra.catalog.entity.ProductImage;
import com.vastra.catalog.entity.ProductSpec;
import com.vastra.catalog.entity.ProductVariant;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class CatalogMapper {

    public ProductResponseDto toProductDto(Product product) {
        if (product == null) return null;

        // Distinct colors
        Map<String, String> colorMap = new LinkedHashMap<>();
        // Distinct sizes preserving standard order
        Set<String> sizeSet = new LinkedHashSet<>();

        List<ProductVariantDto> variantDtos = new ArrayList<>();
        if (product.getVariants() != null) {
            for (ProductVariant v : product.getVariants()) {
                colorMap.putIfAbsent(v.getColorName(), v.getColorHex());
                sizeSet.add(v.getSize());

                variantDtos.add(ProductVariantDto.builder()
                        .id(v.getId())
                        .sku(v.getSku())
                        .colorName(v.getColorName())
                        .colorHex(v.getColorHex())
                        .size(v.getSize())
                        .price(v.getPrice())
                        .stock(v.getStock())
                        .image(v.getImage())
                        .build());
            }
        }

        List<ColorOptionDto> colors = colorMap.entrySet().stream()
                .map(e -> ColorOptionDto.builder().name(e.getKey()).hex(e.getValue()).build())
                .collect(Collectors.toList());

        List<String> images = product.getImages() != null
                ? product.getImages().stream().map(ProductImage::getImageUrl).collect(Collectors.toList())
                : Collections.emptyList();

        List<String> careInstructions = product.getCareInstructions() != null
                ? product.getCareInstructions().stream().map(ProductCareInstruction::getInstruction).collect(Collectors.toList())
                : Collections.emptyList();

        Map<String, String> specifications = new LinkedHashMap<>();
        if (product.getSpecs() != null) {
            for (ProductSpec s : product.getSpecs()) {
                specifications.put(s.getSpecKey(), s.getSpecValue());
            }
        }

        List<String> badges = new ArrayList<>();
        if (product.isBestseller()) badges.add("BESTSELLER");
        if (product.isNew()) badges.add("NEW");
        if (product.isSale()) badges.add("SALE");

        return ProductResponseDto.builder()
                .id(product.getId())
                .slug(product.getSlug())
                .name(product.getName())
                .subtitle(product.getSubtitle())
                .description(product.getDescription())
                .category(product.getCategory() != null ? product.getCategory().getName() : "")
                .collection(product.getCollection() != null ? product.getCollection().getName() : "")
                .price(product.getPrice())
                .originalPrice(product.getOriginalPrice())
                .discountPercentage(product.getDiscountPercentage())
                .rating(product.getRating())
                .reviewCount(product.getReviewCount())
                .badges(badges)
                .colors(colors)
                .sizes(new ArrayList<>(sizeSet))
                .images(images)
                .fabric(product.getFabric())
                .gsm(product.getGsm())
                .fit(product.getFit())
                .modelInfo(product.getModelInfo())
                .careInstructions(careInstructions)
                .specifications(specifications)
                .isNew(product.isNew())
                .isBestseller(product.isBestseller())
                .isSale(product.isSale())
                .featured(product.isFeatured())
                .variants(variantDtos)
                .build();
    }

    public CollectionResponseDto toCollectionDto(Collection collection, long productCount) {
        if (collection == null) return null;
        return CollectionResponseDto.builder()
                .id(collection.getId())
                .title(collection.getName())
                .slug(collection.getSlug())
                .count(productCount)
                .image(collection.getImage())
                .description(collection.getDescription())
                .gsmRange(collection.getGsmRange())
                .build();
    }
}
