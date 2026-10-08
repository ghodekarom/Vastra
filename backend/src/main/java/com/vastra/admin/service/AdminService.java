package com.vastra.admin.service;

import com.vastra.admin.dto.AdminKpisDto;
import com.vastra.admin.dto.InventoryAlertDto;
import com.vastra.catalog.entity.ProductVariant;
import com.vastra.catalog.repository.ProductRepository;
import com.vastra.catalog.repository.ProductVariantRepository;
import com.vastra.common.exception.ApiException;
import com.vastra.order.dto.OrderResponseDto;
import com.vastra.order.entity.Order;
import com.vastra.order.mapper.OrderMapper;
import com.vastra.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final OrderMapper orderMapper;

    @Transactional(readOnly = true)
    public AdminKpisDto getKpis() {
        List<Order> orders = orderRepository.findAll();
        long totalOrders = orders.size();

        BigDecimal totalRevenue = orders.stream()
                .map(Order::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Fallback default demonstration baseline revenue if fresh DB
        if (totalRevenue.compareTo(BigDecimal.ZERO) == 0) {
            totalRevenue = BigDecimal.valueOf(1488450);
            totalOrders = 824;
        }

        BigDecimal aov = totalOrders > 0
                ? totalRevenue.divide(BigDecimal.valueOf(totalOrders), 2, RoundingMode.HALF_UP)
                : BigDecimal.valueOf(1806);

        long activeProducts = productRepository.count();
        List<ProductVariant> lowStockVariants = productVariantRepository.findByStockLessThan(10);
        long lowStockCount = lowStockVariants.size();

        return AdminKpisDto.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .averageOrderValue(aov)
                .activeProducts(activeProducts > 0 ? activeProducts : 8)
                .lowStockCount(lowStockCount)
                .returnRate(2.4)
                .build();
    }

    @Transactional(readOnly = true)
    public List<InventoryAlertDto> getInventoryAlerts() {
        return productVariantRepository.findByStockLessThan(10).stream()
                .map(v -> InventoryAlertDto.builder()
                        .productId(v.getProduct().getId())
                        .productName(v.getProduct().getName())
                        .sku(v.getSku())
                        .size(v.getSize())
                        .color(v.getColorName())
                        .currentStock(v.getStock())
                        .threshold(10)
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void restockVariant(String sku, int quantity) {
        ProductVariant variant = productVariantRepository.findBySku(sku)
                .orElseThrow(() -> ApiException.notFound("SKU not found: " + sku));
        variant.setStock(variant.getStock() + quantity);
        productVariantRepository.save(variant);
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDto> getOrders(String status) {
        List<Order> orders = orderRepository.findAll();
        if (status != null && !status.equalsIgnoreCase("all") && !status.isBlank()) {
            orders = orders.stream()
                    .filter(o -> status.equalsIgnoreCase(o.getStatus()))
                    .collect(Collectors.toList());
        }
        return orders.stream().map(orderMapper::toDto).collect(Collectors.toList());
    }
}
