package com.vastra.order.dto;

import com.vastra.cart.dto.CartItemDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderPayloadDto {

    @NotEmpty(message = "Items list cannot be empty")
    private List<CartItemDto> items;

    @NotNull(message = "Shipping address is required")
    @Valid
    private ShippingAddressDto shippingAddress;

    @Builder.Default
    private String shippingMethod = "STANDARD";

    @NotNull(message = "Payment method is required")
    private String paymentMethod;

    private String discountCode;
}
