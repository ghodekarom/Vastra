package com.vastra.review.service;

import com.vastra.catalog.entity.Product;
import com.vastra.catalog.repository.ProductRepository;
import com.vastra.common.exception.ApiException;
import com.vastra.review.dto.CreateReviewDto;
import com.vastra.review.dto.ReviewDto;
import com.vastra.review.entity.Review;
import com.vastra.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ReviewDto> getProductReviews(String productIdentifier) {
        Product product = productRepository.findBySlug(productIdentifier)
                .or(() -> productRepository.findById(productIdentifier))
                .orElseThrow(() -> ApiException.notFound("Product not found: " + productIdentifier));

        return reviewRepository.findByProductIdAndApprovedTrueOrderByCreatedAtDesc(product.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto addReview(String productIdentifier, CreateReviewDto dto) {
        Product product = productRepository.findBySlug(productIdentifier)
                .or(() -> productRepository.findById(productIdentifier))
                .orElseThrow(() -> ApiException.notFound("Product not found: " + productIdentifier));

        Review review = Review.builder()
                .id(UUID.randomUUID().toString())
                .product(product)
                .userName(dto.getUserName())
                .rating(dto.getRating())
                .comment(dto.getComment())
                .verifiedBuyer(true)
                .approved(true)
                .build();

        review = reviewRepository.save(review);

        // Update product review count and rating
        int newCount = product.getReviewCount() + 1;
        BigDecimal currentTotalRating = product.getRating().multiply(BigDecimal.valueOf(product.getReviewCount()));
        BigDecimal newTotalRating = currentTotalRating.add(BigDecimal.valueOf(dto.getRating()));
        BigDecimal newAvgRating = newTotalRating.divide(BigDecimal.valueOf(newCount), 1, RoundingMode.HALF_UP);

        product.setReviewCount(newCount);
        product.setRating(newAvgRating);
        productRepository.save(product);

        return mapToDto(review);
    }

    private ReviewDto mapToDto(Review r) {
        return ReviewDto.builder()
                .id(r.getId())
                .userName(r.getUserName())
                .rating(r.getRating())
                .comment(r.getComment())
                .verifiedBuyer(r.isVerifiedBuyer())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
