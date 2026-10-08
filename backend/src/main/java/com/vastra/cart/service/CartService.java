package com.vastra.cart.service;

import com.vastra.auth.entity.User;
import com.vastra.auth.repository.UserRepository;
import com.vastra.cart.dto.CartItemDto;
import com.vastra.cart.dto.CartSummaryDto;
import com.vastra.cart.entity.Cart;
import com.vastra.cart.entity.CartItem;
import com.vastra.cart.repository.CartItemRepository;
import com.vastra.cart.repository.CartRepository;
import com.vastra.catalog.entity.ProductVariant;
import com.vastra.catalog.repository.ProductVariantRepository;
import com.vastra.common.exception.ApiException;
import com.vastra.coupon.entity.Coupon;
import com.vastra.coupon.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository productVariantRepository;
    private final CouponRepository couponRepository;
    private final UserRepository userRepository;

    @Value("${vastra.commerce.free-shipping-threshold:1999.00}")
    private BigDecimal freeShippingThreshold;

    @Value("${vastra.commerce.standard-shipping-fee:99.00}")
    private BigDecimal standardShippingFee;

    @Transactional
    public Cart getOrCreateCart(String userId, String guestToken) {
        if (userId != null) {
            return cartRepository.findByUserId(userId).orElseGet(() -> {
                User user = userRepository.findById(userId).orElse(null);
                Cart cart = Cart.builder()
                        .id(UUID.randomUUID().toString())
                        .user(user)
                        .build();
                return cartRepository.save(cart);
            });
        }

        String token = (guestToken != null && !guestToken.isBlank()) ? guestToken : UUID.randomUUID().toString();
        return cartRepository.findByGuestToken(token).orElseGet(() -> {
            Cart cart = Cart.builder()
                    .id(UUID.randomUUID().toString())
                    .guestToken(token)
                    .build();
            return cartRepository.save(cart);
        });
    }

    @Transactional
    public CartSummaryDto addItem(String userId, String guestToken, String sku, int quantity) {
        Cart cart = getOrCreateCart(userId, guestToken);
        ProductVariant variant = productVariantRepository.findBySku(sku)
                .orElseThrow(() -> ApiException.notFound("Product variant not found with SKU: " + sku));

        CartItem existingItem = cartItemRepository.findByCartIdAndVariantId(cart.getId(), variant.getId())
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = CartItem.builder()
                    .id(UUID.randomUUID().toString())
                    .cart(cart)
                    .variant(variant)
                    .quantity(quantity)
                    .build();
            cartItemRepository.save(newItem);
        }

        return getCartSummary(userId, guestToken, null);
    }

    @Transactional
    public CartSummaryDto updateItemQuantity(String itemId, int quantity, String userId, String guestToken) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> ApiException.notFound("Cart item not found: " + itemId));

        if (quantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return getCartSummary(userId, guestToken, null);
    }

    @Transactional
    public CartSummaryDto removeItem(String itemId, String userId, String guestToken) {
        cartItemRepository.deleteById(itemId);
        return getCartSummary(userId, guestToken, null);
    }

    @Transactional(readOnly = true)
    public CartSummaryDto getCartSummary(String userId, String guestToken, String couponCode) {
        Cart cart = null;
        if (userId != null) {
            cart = cartRepository.findByUserId(userId).orElse(null);
        } else if (guestToken != null) {
            cart = cartRepository.findByGuestToken(guestToken).orElse(null);
        }

        List<CartItemDto> items = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        if (cart != null && cart.getItems() != null) {
            for (CartItem ci : cart.getItems()) {
                ProductVariant v = ci.getVariant();
                BigDecimal itemPrice = v.getPrice();
                BigDecimal itemOriginal = v.getProduct().getOriginalPrice();

                subtotal = subtotal.add(itemPrice.multiply(BigDecimal.valueOf(ci.getQuantity())));

                items.add(CartItemDto.builder()
                        .id(ci.getId())
                        .productId(v.getProduct().getId())
                        .name(v.getProduct().getName())
                        .slug(v.getProduct().getSlug())
                        .color(v.getColorName())
                        .size(v.getSize())
                        .quantity(ci.getQuantity())
                        .price(itemPrice)
                        .originalPrice(itemOriginal)
                        .image(v.getImage() != null ? v.getImage() : "/images/products/shadow-print.jpg")
                        .sku(v.getSku())
                        .build());
            }
        }

        BigDecimal discountAmount = BigDecimal.ZERO;
        if (couponCode != null && !couponCode.isBlank()) {
            Coupon coupon = couponRepository.findByCodeIgnoreCaseAndActiveTrue(couponCode.trim().toUpperCase()).orElse(null);
            if (coupon != null && (coupon.getMinOrderValue() == null || subtotal.compareTo(coupon.getMinOrderValue()) >= 0)) {
                if ("PERCENTAGE".equalsIgnoreCase(coupon.getDiscountType())) {
                    discountAmount = subtotal.multiply(coupon.getDiscountValue())
                            .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                    if (coupon.getMaxDiscountAmount() != null && discountAmount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                        discountAmount = coupon.getMaxDiscountAmount();
                    }
                } else {
                    discountAmount = coupon.getDiscountValue();
                }
            }
        }

        boolean isFreeShipping = subtotal.compareTo(freeShippingThreshold) >= 0 || subtotal.compareTo(BigDecimal.ZERO) == 0;
        BigDecimal shippingFee = isFreeShipping ? BigDecimal.ZERO : standardShippingFee;
        BigDecimal total = subtotal.subtract(discountAmount).add(shippingFee).max(BigDecimal.ZERO);
        BigDecimal amountNeeded = freeShippingThreshold.subtract(subtotal).max(BigDecimal.ZERO);

        return CartSummaryDto.builder()
                .items(items)
                .subtotal(subtotal)
                .discountAmount(discountAmount)
                .shippingFee(shippingFee)
                .total(total)
                .isFreeShippingEligible(isFreeShipping)
                .freeShippingThreshold(freeShippingThreshold)
                .amountNeededForFreeShipping(amountNeeded)
                .activeCoupon(couponCode)
                .build();
    }

    @Transactional
    public void mergeGuestCart(String userId, String guestToken) {
        if (userId == null || guestToken == null) return;
        Cart guestCart = cartRepository.findByGuestToken(guestToken).orElse(null);
        if (guestCart == null || guestCart.getItems().isEmpty()) return;

        Cart userCart = getOrCreateCart(userId, null);

        for (CartItem gi : guestCart.getItems()) {
            CartItem userItem = cartItemRepository.findByCartIdAndVariantId(userCart.getId(), gi.getVariant().getId()).orElse(null);
            if (userItem != null) {
                userItem.setQuantity(userItem.getQuantity() + gi.getQuantity());
                cartItemRepository.save(userItem);
            } else {
                gi.setCart(userCart);
                cartItemRepository.save(gi);
            }
        }

        cartRepository.delete(guestCart);
    }
}
