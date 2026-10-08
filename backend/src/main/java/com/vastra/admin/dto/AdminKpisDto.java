package com.vastra.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminKpisDto {
    private BigDecimal totalRevenue;
    private long totalOrders;
    private BigDecimal averageOrderValue;
    private long activeProducts;
    private long lowStockCount;
    private double returnRate;
}
