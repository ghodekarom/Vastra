package com.vastra.cart.controller;

import com.vastra.cart.dto.CartSummaryDto;
import com.vastra.cart.service.CartService;
import com.vastra.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Shopping Bag Operations and Authoritative Calculations")
public class CartController {

    private final CartService cartService;

    @GetMapping
    @Operation(summary = "Get cart items and computed financial summary")
    public ResponseEntity<ApiResponse<CartSummaryDto>> getCart(
            @RequestHeader(name = "X-Cart-Token", required = false) String cartToken,
            @RequestParam(name = "coupon", required = false) String coupon,
            Authentication authentication
    ) {
        String userId = getUserId(authentication);
        CartSummaryDto summary = cartService.getCartSummary(userId, cartToken, coupon);
        return ResponseEntity.ok(ApiResponse.ok(summary));
    }

    @PostMapping("/items")
    @Operation(summary = "Add an item to the shopping bag")
    public ResponseEntity<ApiResponse<CartSummaryDto>> addItem(
            @RequestHeader(name = "X-Cart-Token", required = false) String cartToken,
            @RequestBody Map<String, Object> body,
            Authentication authentication
    ) {
        String userId = getUserId(authentication);
        String sku = (String) body.get("sku");
        int quantity = ((Number) body.getOrDefault("quantity", 1)).intValue();

        CartSummaryDto summary = cartService.addItem(userId, cartToken, sku, quantity);
        return ResponseEntity.ok(ApiResponse.ok(summary, "Item added to cart"));
    }

    @PatchMapping("/items/{itemId}")
    @Operation(summary = "Update line item quantity")
    public ResponseEntity<ApiResponse<CartSummaryDto>> updateQuantity(
            @PathVariable String itemId,
            @RequestBody Map<String, Integer> body,
            @RequestHeader(name = "X-Cart-Token", required = false) String cartToken,
            Authentication authentication
    ) {
        String userId = getUserId(authentication);
        int quantity = body.getOrDefault("quantity", 1);
        CartSummaryDto summary = cartService.updateItemQuantity(itemId, quantity, userId, cartToken);
        return ResponseEntity.ok(ApiResponse.ok(summary, "Quantity updated"));
    }

    @DeleteMapping("/items/{itemId}")
    @Operation(summary = "Remove an item from cart")
    public ResponseEntity<ApiResponse<CartSummaryDto>> removeItem(
            @PathVariable String itemId,
            @RequestHeader(name = "X-Cart-Token", required = false) String cartToken,
            Authentication authentication
    ) {
        String userId = getUserId(authentication);
        CartSummaryDto summary = cartService.removeItem(itemId, userId, cartToken);
        return ResponseEntity.ok(ApiResponse.ok(summary, "Item removed from cart"));
    }

    @PostMapping("/merge")
    @Operation(summary = "Merge guest cart into authenticated customer account")
    public ResponseEntity<ApiResponse<String>> mergeCart(
            @RequestHeader(name = "X-Cart-Token") String cartToken,
            Authentication authentication
    ) {
        String userId = getUserId(authentication);
        if (userId != null) {
            cartService.mergeGuestCart(userId, cartToken);
            return ResponseEntity.ok(ApiResponse.ok("Guest cart merged successfully"));
        }
        return ResponseEntity.ok(ApiResponse.ok("No user authenticated to merge into"));
    }

    private String getUserId(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal())) {
            return (String) authentication.getPrincipal();
        }
        return null;
    }
}
