package com.vastra.order;

import com.vastra.cart.dto.CartItemDto;
import com.vastra.catalog.entity.Product;
import com.vastra.catalog.entity.ProductVariant;
import com.vastra.catalog.repository.ProductVariantRepository;
import com.vastra.coupon.entity.Coupon;
import com.vastra.coupon.repository.CouponRepository;
import com.vastra.order.dto.CreateOrderPayloadDto;
import com.vastra.order.dto.OrderResponseDto;
import com.vastra.order.dto.ShippingAddressDto;
import com.vastra.order.entity.Order;
import com.vastra.order.mapper.OrderMapper;
import com.vastra.order.repository.OrderRepository;
import com.vastra.order.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductVariantRepository productVariantRepository;

    @Mock
    private CouponRepository couponRepository;

    @Mock
    private OrderMapper orderMapper;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(orderService, "freeShippingThreshold", BigDecimal.valueOf(1999.00));
        ReflectionTestUtils.setField(orderService, "standardShippingFee", BigDecimal.valueOf(99.00));
        ReflectionTestUtils.setField(orderService, "expressShippingFee", BigDecimal.valueOf(199.00));
    }

    @Test
    void testCreateOrderWithAuthoritativeCalculationAndStockDeduction() {
        Product product = Product.builder()
                .id("vst-001")
                .name("Shadow Print Oversized Tee")
                .originalPrice(BigDecimal.valueOf(2499))
                .build();

        ProductVariant variant = ProductVariant.builder()
                .id("var-01-m")
                .sku("VST-SHD-CH-M")
                .price(BigDecimal.valueOf(1799.00))
                .stock(10)
                .product(product)
                .size("M")
                .colorName("Charcoal")
                .build();

        when(productVariantRepository.findBySku("VST-SHD-CH-M")).thenReturn(Optional.of(variant));

        Coupon coupon = Coupon.builder()
                .code("VASTRA10")
                .discountType("PERCENTAGE")
                .discountValue(BigDecimal.valueOf(10.00))
                .minOrderValue(BigDecimal.valueOf(999.00))
                .active(true)
                .build();

        when(couponRepository.findByCodeIgnoreCaseAndActiveTrue("VASTRA10")).thenReturn(Optional.of(coupon));

        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        when(orderMapper.toDto(any(Order.class))).thenAnswer(invocation -> {
            Order o = invocation.getArgument(0);
            return OrderResponseDto.builder()
                    .orderNumber(o.getOrderNumber())
                    .subtotal(o.getSubtotal())
                    .discount(o.getDiscount())
                    .shipping(o.getShippingFee())
                    .total(o.getTotal())
                    .build();
        });

        CartItemDto item = CartItemDto.builder()
                .sku("VST-SHD-CH-M")
                .name("Shadow Print Oversized Tee")
                .quantity(1)
                .price(BigDecimal.valueOf(100)) // client sends bogus price ₹100
                .build();

        ShippingAddressDto address = ShippingAddressDto.builder()
                .fullName("Aarav Sharma")
                .phone("+91 98765 43210")
                .street("12th Main Road")
                .city("Bengaluru")
                .state("Karnataka")
                .pincode("560038")
                .build();

        CreateOrderPayloadDto payload = CreateOrderPayloadDto.builder()
                .items(List.of(item))
                .shippingAddress(address)
                .shippingMethod("STANDARD")
                .paymentMethod("UPI")
                .discountCode("VASTRA10")
                .build();

        OrderResponseDto response = orderService.createOrder(payload, null);

        assertNotNull(response);
        // Server overrides bogus client price ₹100 with authoritative DB price ₹1799
        assertEquals(BigDecimal.valueOf(1799.00), response.getSubtotal());
        // 10% discount on 1799 = 179.90
        assertEquals(new BigDecimal("179.90"), response.getDiscount());
        // Subtotal (1799) is below 1999 -> Standard shipping ₹99 added
        assertEquals(BigDecimal.valueOf(99.00), response.getShipping());
        // Total = 1799 - 179.90 + 99 = 1718.10
        assertEquals(new BigDecimal("1718.10"), response.getTotal());
        // Inventory decremented from 10 to 9
        assertEquals(9, variant.getStock());
    }
}
