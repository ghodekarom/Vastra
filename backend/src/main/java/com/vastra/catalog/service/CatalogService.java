package com.vastra.catalog.service;

import com.vastra.catalog.dto.CollectionResponseDto;
import com.vastra.catalog.dto.ProductResponseDto;
import com.vastra.catalog.entity.Product;
import com.vastra.catalog.mapper.CatalogMapper;
import com.vastra.catalog.repository.CollectionRepository;
import com.vastra.catalog.repository.ProductRepository;
import com.vastra.common.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CatalogService {

    private final ProductRepository productRepository;
    private final CollectionRepository collectionRepository;
    private final CatalogMapper catalogMapper;

    public List<ProductResponseDto> getProducts(
            String category,
            String collection,
            Integer minGsm,
            Integer maxGsm,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String query,
            String sort
    ) {
        Sort sortSpec = Sort.by(Sort.Direction.DESC, "createdAt");
        if ("price-asc".equalsIgnoreCase(sort)) {
            sortSpec = Sort.by(Sort.Direction.ASC, "price");
        } else if ("price-desc".equalsIgnoreCase(sort)) {
            sortSpec = Sort.by(Sort.Direction.DESC, "price");
        } else if ("featured".equalsIgnoreCase(sort)) {
            sortSpec = Sort.by(Sort.Direction.DESC, "featured");
        }

        Pageable pageable = PageRequest.of(0, 100, sortSpec);

        org.springframework.data.jpa.domain.Specification<Product> spec = (root, querySpec, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();
            predicates.add(cb.equal(root.get("status"), "ACTIVE"));

            if (category != null && !category.isBlank() && !"all".equalsIgnoreCase(category)) {
                predicates.add(cb.or(
                        cb.equal(cb.lower(root.get("category").get("slug")), category.toLowerCase().trim()),
                        cb.equal(cb.lower(root.get("category").get("name")), category.toLowerCase().trim())
                ));
            }

            if (collection != null && !collection.isBlank() && !"all".equalsIgnoreCase(collection)) {
                predicates.add(cb.or(
                        cb.equal(cb.lower(root.get("collection").get("slug")), collection.toLowerCase().trim()),
                        cb.equal(cb.lower(root.get("collection").get("name")), collection.toLowerCase().trim())
                ));
            }

            if (minGsm != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("gsm"), minGsm));
            }

            if (maxGsm != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("gsm"), maxGsm));
            }

            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (query != null && !query.isBlank()) {
                String pattern = "%" + query.toLowerCase().trim() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), pattern),
                        cb.like(cb.lower(root.get("description")), pattern),
                        cb.like(cb.lower(root.get("fabric")), pattern)
                ));
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };

        Page<Product> pageResult = productRepository.findAll(spec, pageable);

        return pageResult.getContent().stream()
                .map(catalogMapper::toProductDto)
                .collect(Collectors.toList());
    }

    public ProductResponseDto getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> ApiException.notFound("Product not found with slug: " + slug));
        return catalogMapper.toProductDto(product);
    }

    public List<ProductResponseDto> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueOrIsBestsellerTrue().stream()
                .map(catalogMapper::toProductDto)
                .collect(Collectors.toList());
    }

    public List<CollectionResponseDto> getCollections() {
        return collectionRepository.findAll().stream()
                .map(c -> catalogMapper.toCollectionDto(c, 4))
                .collect(Collectors.toList());
    }
}
