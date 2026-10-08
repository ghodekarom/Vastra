package com.vastra.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryAlertDto {
    private String productId;
    private String productName;
    private String sku;
    private String size;
    private String color;
    private int currentStock;
    private int threshold;
}
