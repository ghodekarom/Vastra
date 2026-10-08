package com.vastra.catalog.controller;

import com.vastra.catalog.dto.CollectionResponseDto;
import com.vastra.catalog.dto.ProductResponseDto;
import com.vastra.catalog.service.CatalogService;
import com.vastra.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Catalog", description = "Public Product & Collections Catalog Endpoints")
public class CatalogController {

    private final CatalogService catalogService;

    @GetMapping("/products")
    @Operation(summary = "List and search catalog products with filters")
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String collection,
            @RequestParam(required = false) Integer minGsm,
            @RequestParam(required = false) Integer maxGsm,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(name = "q", required = false) String query,
            @RequestParam(required = false) String sort
    ) {
        List<ProductResponseDto> products = catalogService.getProducts(
                category, collection, minGsm, maxGsm, minPrice, maxPrice, query, sort
        );
        return ResponseEntity.ok(ApiResponse.ok(products));
    }

    @GetMapping("/products/featured")
    @Operation(summary = "Get featured and bestseller products for hero/home rail")
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getFeaturedProducts() {
        List<ProductResponseDto> featured = catalogService.getFeaturedProducts();
        return ResponseEntity.ok(ApiResponse.ok(featured));
    }

    @GetMapping("/products/{slug}")
    @Operation(summary = "Get single product by its URL slug")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getProductBySlug(@PathVariable String slug) {
        ProductResponseDto product = catalogService.getProductBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok(product));
    }

    @GetMapping("/collections")
    @Operation(summary = "List curated collections")
    public ResponseEntity<ApiResponse<List<CollectionResponseDto>>> getCollections() {
        List<CollectionResponseDto> collections = catalogService.getCollections();
        return ResponseEntity.ok(ApiResponse.ok(collections));
    }
}
