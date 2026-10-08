package com.vastra.order.mapper;

import com.vastra.cart.dto.CartItemDto;
import com.vastra.order.dto.OrderResponseDto;
import com.vastra.order.dto.ShippingAddressDto;
import com.vastra.order.entity.Order;
import com.vastra.order.entity.OrderItem;
import com.vastra.order.entity.OrderShippingAddress;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")
            .withZone(ZoneId.of("Asia/Kolkata"));

    public OrderResponseDto toDto(Order order) {
        if (order == null) return null;

        List<CartItemDto> items = order.getItems() != null ? order.getItems().stream()
                .map(this::toItemDto)
                .collect(Collectors.toList()) : Collections.emptyList();

        ShippingAddressDto addressDto = null;
        if (order.getShippingAddress() != null) {
            OrderShippingAddress addr = order.getShippingAddress();
            addressDto = ShippingAddressDto.builder()
                    .fullName(addr.getFullName())
                    .phone(addr.getPhone())
                    .street(addr.getStreet())
                    .city(addr.getCity())
                    .state(addr.getState())
                    .pincode(addr.getPincode())
                    .email(addr.getEmail())
                    .build();
        }

        String formattedDate = order.getCreatedAt() != null ? FORMATTER.format(order.getCreatedAt()) : "Recently";

        return OrderResponseDto.builder()
                .id(order.getOrderNumber())
                .orderNumber(order.getOrderNumber())
                .date(formattedDate)
                .status(order.getStatus())
                .items(items)
                .shippingAddress(addressDto)
                .subtotal(order.getSubtotal())
                .discount(order.getDiscount())
                .shipping(order.getShippingFee())
                .total(order.getTotal())
                .paymentMethod(order.getPaymentMethod())
                .trackingNumber(order.getTrackingNumber())
                .estimatedDelivery(order.getEstimatedDelivery())
                .courierPartner(order.getCourierPartner())
                .build();
    }

    private CartItemDto toItemDto(OrderItem item) {
        return CartItemDto.builder()
                .id(item.getId())
                .productId(item.getProduct() != null ? item.getProduct().getId() : null)
                .name(item.getProductName())
                .slug(item.getProductSlug())
                .color(item.getColor())
                .size(item.getSize())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .originalPrice(item.getOriginalPrice())
                .image(item.getImage())
                .sku(item.getVariant() != null ? item.getVariant().getSku() : null)
                .build();
    }
}
