package com.vastra.order.controller;

import com.vastra.common.response.ApiResponse;
import com.vastra.order.dto.CreateOrderPayloadDto;
import com.vastra.order.dto.OrderResponseDto;
import com.vastra.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Order Placement, Tracking, and Customer Order History")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Create an order with authoritative server-side calculation and stock deduction")
    public ResponseEntity<ApiResponse<OrderResponseDto>> createOrder(
            @Valid @RequestBody CreateOrderPayloadDto payload,
            Authentication authentication
    ) {
        String userId = (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal()))
                ? (String) authentication.getPrincipal()
                : null;

        OrderResponseDto order = orderService.createOrder(payload, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(order, "Order placed successfully"));
    }

    @GetMapping("/{orderId}")
    @Operation(summary = "Fetch order details and live shipping status by order ID or tracking number")
    public ResponseEntity<ApiResponse<OrderResponseDto>> getOrderById(@PathVariable String orderId) {
        OrderResponseDto order = orderService.getOrderByOrderNumber(orderId);
        return ResponseEntity.ok(ApiResponse.ok(order));
    }

    @GetMapping("/{orderId}/tracking")
    @Operation(summary = "Fetch live tracking timeline and courier milestones for order")
    public ResponseEntity<ApiResponse<com.vastra.order.dto.OrderTrackingDto>> getTracking(@PathVariable String orderId) {
        com.vastra.order.dto.OrderTrackingDto tracking = orderService.getOrderTracking(orderId);
        return ResponseEntity.ok(ApiResponse.ok(tracking));
    }

    @PostMapping("/{orderId}/cancel")
    @Operation(summary = "Cancel an order and release reserved stock back to catalog")
    public ResponseEntity<ApiResponse<OrderResponseDto>> cancelOrder(
            @PathVariable String orderId,
            Authentication authentication
    ) {
        String userId = (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal()))
                ? (String) authentication.getPrincipal()
                : null;
        OrderResponseDto cancelled = orderService.cancelOrder(orderId, userId);
        return ResponseEntity.ok(ApiResponse.ok(cancelled, "Order cancelled and stock restored"));
    }

    @GetMapping
    @Operation(summary = "Fetch order history for authenticated customer")
    public ResponseEntity<ApiResponse<List<OrderResponseDto>>> getMyOrders(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.ok(ApiResponse.ok(List.of()));
        }
        String userId = (String) authentication.getPrincipal();
        List<OrderResponseDto> orders = orderService.getCustomerOrders(userId);
        return ResponseEntity.ok(ApiResponse.ok(orders));
    }
}
