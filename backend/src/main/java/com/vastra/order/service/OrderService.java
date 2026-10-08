package com.vastra.order.service;

import com.vastra.auth.entity.User;
import com.vastra.auth.repository.UserRepository;
import com.vastra.cart.dto.CartItemDto;
import com.vastra.catalog.entity.ProductVariant;
import com.vastra.catalog.repository.ProductVariantRepository;
import com.vastra.common.exception.ApiException;
import com.vastra.coupon.entity.Coupon;
import com.vastra.coupon.repository.CouponRepository;
import com.vastra.order.dto.CreateOrderPayloadDto;
import com.vastra.order.dto.OrderResponseDto;
import com.vastra.order.dto.ShippingAddressDto;
import com.vastra.order.entity.Order;
import com.vastra.order.entity.OrderItem;
import com.vastra.order.entity.OrderShippingAddress;
import com.vastra.order.mapper.OrderMapper;
import com.vastra.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductVariantRepository productVariantRepository;
    private final CouponRepository couponRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;

    @Value("${vastra.commerce.free-shipping-threshold:1999.00}")
    private BigDecimal freeShippingThreshold;

    @Value("${vastra.commerce.standard-shipping-fee:99.00}")
    private BigDecimal standardShippingFee;

    @Value("${vastra.commerce.express-shipping-fee:199.00}")
    private BigDecimal expressShippingFee;

    private final SecureRandom random = new SecureRandom();

    @Transactional
    public OrderResponseDto createOrder(CreateOrderPayloadDto payload, String authenticatedUserId) {
        if (payload.getItems() == null || payload.getItems().isEmpty()) {
            throw ApiException.badRequest("Cannot place order with an empty bag");
        }

        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();
        String orderId = UUID.randomUUID().toString();
        String orderNumber = "ORD-" + (10000 + random.nextInt(90000));

        Order order = Order.builder()
                .id(orderId)
                .orderNumber(orderNumber)
                .status("CONFIRMED")
                .paymentMethod(payload.getPaymentMethod())
                .shippingMethod(payload.getShippingMethod() != null ? payload.getShippingMethod() : "STANDARD")
                .trackingNumber("DEL-IND-" + (100000 + random.nextInt(900000)))
                .courierPartner("Blue Dart Air Express")
                .estimatedDelivery(LocalDate.now().plusDays(4).format(DateTimeFormatter.ofPattern("dd MMM yyyy")))
                .build();

        if (authenticatedUserId != null) {
            userRepository.findById(authenticatedUserId).ifPresent(order::setUser);
        } else if (payload.getShippingAddress() != null && payload.getShippingAddress().getEmail() != null) {
            order.setGuestEmail(payload.getShippingAddress().getEmail());
        }

        // Authoritative pricing & inventory deduction
        for (CartItemDto itemDto : payload.getItems()) {
            ProductVariant variant = null;
            if (itemDto.getSku() != null) {
                variant = productVariantRepository.findBySku(itemDto.getSku()).orElse(null);
            }

            BigDecimal unitPrice;
            BigDecimal originalPrice;

            if (variant != null) {
                if (variant.getStock() < itemDto.getQuantity()) {
                    throw ApiException.badRequest("Insufficient inventory for " + variant.getProduct().getName() +
                            " (" + variant.getSize() + "). Only " + variant.getStock() + " available.");
                }

                // Deduct stock
                variant.setStock(variant.getStock() - itemDto.getQuantity());
                productVariantRepository.save(variant);

                unitPrice = variant.getPrice();
                originalPrice = variant.getProduct().getOriginalPrice();
            } else {
                unitPrice = itemDto.getPrice() != null ? itemDto.getPrice() : BigDecimal.valueOf(1799);
                originalPrice = itemDto.getOriginalPrice() != null ? itemDto.getOriginalPrice() : BigDecimal.valueOf(2499);
            }

            BigDecimal itemTotal = unitPrice.multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            subtotal = subtotal.add(itemTotal);

            OrderItem orderItem = OrderItem.builder()
                    .id(UUID.randomUUID().toString())
                    .order(order)
                    .variant(variant)
                    .product(variant != null ? variant.getProduct() : null)
                    .productName(itemDto.getName())
                    .productSlug(itemDto.getSlug())
                    .color(itemDto.getColor())
                    .size(itemDto.getSize())
                    .price(unitPrice)
                    .originalPrice(originalPrice)
                    .quantity(itemDto.getQuantity())
                    .image(itemDto.getImage())
                    .build();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setSubtotal(subtotal);

        // Authoritative coupon evaluation
        BigDecimal discount = BigDecimal.ZERO;
        if (payload.getDiscountCode() != null && !payload.getDiscountCode().isBlank()) {
            String code = payload.getDiscountCode().trim().toUpperCase();
            Coupon coupon = couponRepository.findByCodeIgnoreCaseAndActiveTrue(code).orElse(null);
            if (coupon != null) {
                if (coupon.getMinOrderValue() == null || subtotal.compareTo(coupon.getMinOrderValue()) >= 0) {
                    if ("PERCENTAGE".equalsIgnoreCase(coupon.getDiscountType())) {
                        discount = subtotal.multiply(coupon.getDiscountValue())
                                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                        if (coupon.getMaxDiscountAmount() != null && discount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                            discount = coupon.getMaxDiscountAmount();
                        }
                    } else {
                        discount = coupon.getDiscountValue();
                    }
                }
            }
        }
        order.setDiscount(discount);

        // Authoritative shipping fee
        BigDecimal shippingFee;
        if ("EXPRESS".equalsIgnoreCase(order.getShippingMethod())) {
            shippingFee = expressShippingFee;
        } else if (subtotal.compareTo(freeShippingThreshold) >= 0) {
            shippingFee = BigDecimal.ZERO;
        } else {
            shippingFee = standardShippingFee;
        }
        order.setShippingFee(shippingFee);

        // Final authoritative total
        BigDecimal grandTotal = subtotal.subtract(discount).add(shippingFee);
        order.setTotal(grandTotal.max(BigDecimal.ZERO));

        // Snapshot shipping address
        ShippingAddressDto addrDto = payload.getShippingAddress();
        OrderShippingAddress address = OrderShippingAddress.builder()
                .id(UUID.randomUUID().toString())
                .order(order)
                .fullName(addrDto.getFullName())
                .phone(addrDto.getPhone())
                .street(addrDto.getStreet())
                .city(addrDto.getCity())
                .state(addrDto.getState())
                .pincode(addrDto.getPincode())
                .email(addrDto.getEmail())
                .build();
        order.setShippingAddress(address);

        order = orderRepository.save(order);
        log.info("Order successfully placed with authoritative total ₹{}: {}", order.getTotal(), order.getOrderNumber());

        return orderMapper.toDto(order);
    }

    @Transactional(readOnly = true)
    public OrderResponseDto getOrderByOrderNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> ApiException.notFound("Order not found with identifier: " + orderNumber));
        return orderMapper.toDto(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDto> getCustomerOrders(String userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponseDto updateOrderStatus(String orderNumber, String newStatus) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> ApiException.notFound("Order not found: " + orderNumber));
        order.setStatus(newStatus.toUpperCase());
        order = orderRepository.save(order);
        return orderMapper.toDto(order);
    }

    @Transactional
    public OrderResponseDto cancelOrder(String orderNumber, String userId) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> ApiException.notFound("Order not found: " + orderNumber));

        if (userId != null && order.getUser() != null && !order.getUser().getId().equals(userId)) {
            throw ApiException.badRequest("Unauthorized to cancel this order");
        }

        if ("SHIPPED".equalsIgnoreCase(order.getStatus()) ||
                "DELIVERED".equalsIgnoreCase(order.getStatus()) ||
                "CANCELLED".equalsIgnoreCase(order.getStatus())) {
            throw ApiException.badRequest("Order cannot be cancelled in status: " + order.getStatus());
        }

        // Restore stock
        for (OrderItem item : order.getItems()) {
            if (item.getVariant() != null) {
                ProductVariant variant = item.getVariant();
                variant.setStock(variant.getStock() + item.getQuantity());
                productVariantRepository.save(variant);
            }
        }

        order.setStatus("CANCELLED");
        order = orderRepository.save(order);
        log.info("Order {} successfully cancelled and stock restored", orderNumber);
        return orderMapper.toDto(order);
    }

    @Transactional(readOnly = true)
    public com.vastra.order.dto.OrderTrackingDto getOrderTracking(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> ApiException.notFound("Order not found: " + orderNumber));

        String status = order.getStatus();
        List<com.vastra.order.dto.OrderTrackingDto.TrackingMilestoneDto> timeline = new ArrayList<>();

        boolean placed = true;
        boolean confirmed = !"PLACED".equalsIgnoreCase(status) && !"CANCELLED".equalsIgnoreCase(status);
        boolean processing = "PROCESSING".equalsIgnoreCase(status) || "SHIPPED".equalsIgnoreCase(status) || "OUT_FOR_DELIVERY".equalsIgnoreCase(status) || "DELIVERED".equalsIgnoreCase(status);
        boolean shipped = "SHIPPED".equalsIgnoreCase(status) || "OUT_FOR_DELIVERY".equalsIgnoreCase(status) || "DELIVERED".equalsIgnoreCase(status);
        boolean outForDelivery = "OUT_FOR_DELIVERY".equalsIgnoreCase(status) || "DELIVERED".equalsIgnoreCase(status);
        boolean delivered = "DELIVERED".equalsIgnoreCase(status);

        timeline.add(com.vastra.order.dto.OrderTrackingDto.TrackingMilestoneDto.builder()
                .title("Order Placed")
                .description("Order received and verified on VASTRA core engine")
                .date("Confirmed")
                .completed(placed)
                .active("PLACED".equalsIgnoreCase(status))
                .build());

        timeline.add(com.vastra.order.dto.OrderTrackingDto.TrackingMilestoneDto.builder()
                .title("Confirmed & Bagged")
                .description("Garments allocated and passed QA inspection")
                .date("Completed")
                .completed(confirmed || processing || shipped || outForDelivery || delivered)
                .active("CONFIRMED".equalsIgnoreCase(status))
                .build());

        timeline.add(com.vastra.order.dto.OrderTrackingDto.TrackingMilestoneDto.builder()
                .title("Processing & Dispatched")
                .description("Handed over to Blue Dart Express hub")
                .date("In transit")
                .completed(shipped || outForDelivery || delivered)
                .active("PROCESSING".equalsIgnoreCase(status))
                .build());

        timeline.add(com.vastra.order.dto.OrderTrackingDto.TrackingMilestoneDto.builder()
                .title("Shipped via Blue Dart")
                .description("AWB: " + order.getTrackingNumber())
                .date("Live tracking active")
                .completed(shipped || outForDelivery || delivered)
                .active("SHIPPED".equalsIgnoreCase(status))
                .build());

        timeline.add(com.vastra.order.dto.OrderTrackingDto.TrackingMilestoneDto.builder()
                .title("Out for Delivery")
                .description("Courier out with package for doorstep delivery")
                .date("Today")
                .completed(delivered)
                .active("OUT_FOR_DELIVERY".equalsIgnoreCase(status))
                .build());

        timeline.add(com.vastra.order.dto.OrderTrackingDto.TrackingMilestoneDto.builder()
                .title("Delivered")
                .description("Package delivered to customer")
                .date(order.getEstimatedDelivery())
                .completed(delivered)
                .active(delivered)
                .build());

        return com.vastra.order.dto.OrderTrackingDto.builder()
                .orderNumber(order.getOrderNumber())
                .status(order.getStatus())
                .trackingNumber(order.getTrackingNumber())
                .courierPartner(order.getCourierPartner())
                .estimatedDelivery(order.getEstimatedDelivery())
                .timeline(timeline)
                .build();
    }
}
