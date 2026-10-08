package com.vastra.wishlist.controller;

import com.vastra.common.response.ApiResponse;
import com.vastra.wishlist.dto.WishlistToggleResponseDto;
import com.vastra.wishlist.service.WishlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/wishlist")
@RequiredArgsConstructor
@Tag(name = "Wishlist", description = "Wishlist Management and Product Bookmark Operations")
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    @Operation(summary = "Get list of saved product IDs in wishlist")
    public ResponseEntity<ApiResponse<List<String>>> getWishlist(Authentication authentication) {
        String userId = getUserId(authentication);
        List<String> productIds = wishlistService.getWishlistProductIds(userId);
        return ResponseEntity.ok(ApiResponse.ok(productIds));
    }

    @PostMapping("/toggle")
    @Operation(summary = "Toggle product in/out of wishlist")
    public ResponseEntity<ApiResponse<WishlistToggleResponseDto>> toggleWishlist(
            @RequestBody Map<String, String> body,
            Authentication authentication
    ) {
        String userId = getUserId(authentication);
        String productId = body.get("productId");
        WishlistToggleResponseDto response = wishlistService.toggleWishlist(userId, productId);
        return ResponseEntity.ok(ApiResponse.ok(response, response.isSaved() ? "Saved to wishlist" : "Removed from wishlist"));
    }

    private String getUserId(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal())) {
            return (String) authentication.getPrincipal();
        }
        return null;
    }
}
