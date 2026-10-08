package com.vastra.admin.controller;

import com.vastra.admin.dto.AdminKpisDto;
import com.vastra.admin.dto.InventoryAlertDto;
import com.vastra.admin.service.AdminService;
import com.vastra.common.response.ApiResponse;
import com.vastra.order.dto.OrderResponseDto;
import com.vastra.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Operations", description = "Admin KPIs, Inventory Alerts, Restock, and Order Fulfillment")
public class AdminController {

    private final AdminService adminService;
    private final OrderService orderService;

    @GetMapping("/kpis")
    @Operation(summary = "Get high-level store KPIs (Revenue, Orders, AOV, Low Stock)")
    public ResponseEntity<ApiResponse<AdminKpisDto>> getKpis() {
        AdminKpisDto kpis = adminService.getKpis();
        return ResponseEntity.ok(ApiResponse.ok(kpis));
    }

    @GetMapping("/inventory/alerts")
    @Operation(summary = "Get low stock SKU alerts below safety threshold")
    public ResponseEntity<ApiResponse<List<InventoryAlertDto>>> getInventoryAlerts() {
        List<InventoryAlertDto> alerts = adminService.getInventoryAlerts();
        return ResponseEntity.ok(ApiResponse.ok(alerts));
    }

    @PostMapping("/inventory/restock")
    @Operation(summary = "Restock SKU units")
    public ResponseEntity<ApiResponse<String>> restockVariant(@RequestBody Map<String, Object> body) {
        String sku = (String) body.get("sku");
        int quantity = ((Number) body.getOrDefault("quantity", 25)).intValue();
        adminService.restockVariant(sku, quantity);
        return ResponseEntity.ok(ApiResponse.ok("SKU " + sku + " restocked with " + quantity + " units"));
    }

    @GetMapping("/orders")
    @Operation(summary = "Get list of orders with optional status filter")
    public ResponseEntity<ApiResponse<List<OrderResponseDto>>> getOrders(@RequestParam(required = false) String status) {
        List<OrderResponseDto> orders = adminService.getOrders(status);
        return ResponseEntity.ok(ApiResponse.ok(orders));
    }

    @PatchMapping("/orders/{orderNumber}/status")
    @Operation(summary = "Update order status for fulfillment dispatch tracking")
    public ResponseEntity<ApiResponse<OrderResponseDto>> updateOrderStatus(
            @PathVariable String orderNumber,
            @RequestBody Map<String, String> body
    ) {
        String newStatus = body.get("status");
        OrderResponseDto updated = orderService.updateOrderStatus(orderNumber, newStatus);
        return ResponseEntity.ok(ApiResponse.ok(updated, "Order status updated to " + newStatus));
    }
}
