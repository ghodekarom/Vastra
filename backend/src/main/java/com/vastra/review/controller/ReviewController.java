package com.vastra.review.controller;

import com.vastra.common.response.ApiResponse;
import com.vastra.review.dto.CreateReviewDto;
import com.vastra.review.dto.ReviewDto;
import com.vastra.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products/{productId}/reviews")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Customer Verified Product Reviews and Rating Endpoints")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    @Operation(summary = "Get list of verified customer reviews for a garment")
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getReviews(@PathVariable String productId) {
        List<ReviewDto> list = reviewService.getProductReviews(productId);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @PostMapping
    @Operation(summary = "Submit a customer review for a garment")
    public ResponseEntity<ApiResponse<ReviewDto>> createReview(
            @PathVariable String productId,
            @Valid @RequestBody CreateReviewDto request
    ) {
        ReviewDto created = reviewService.addReview(productId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(created, "Review submitted successfully"));
    }
}
