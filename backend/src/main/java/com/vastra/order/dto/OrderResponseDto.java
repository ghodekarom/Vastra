package com.vastra.order.dto;

import com.vastra.cart.dto.CartItemDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private String id;
    private String orderNumber;
    private String date;
    private String status;
    private List<CartItemDto> items;
    private ShippingAddressDto shippingAddress;
    private BigDecimal subtotal;
    private BigDecimal discount;
    private BigDecimal shipping;
    private BigDecimal total;
    private String paymentMethod;
    private String trackingNumber;
    private String estimatedDelivery;
    private String courierPartner;
}
