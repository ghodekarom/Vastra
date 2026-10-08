package com.vastra.wishlist.service;

import com.vastra.auth.entity.User;
import com.vastra.auth.repository.UserRepository;
import com.vastra.catalog.entity.Product;
import com.vastra.catalog.repository.ProductRepository;
import com.vastra.common.exception.ApiException;
import com.vastra.wishlist.dto.WishlistToggleResponseDto;
import com.vastra.wishlist.entity.Wishlist;
import com.vastra.wishlist.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<String> getWishlistProductIds(String userId) {
        if (userId == null) {
            return List.of();
        }
        return wishlistRepository.findByUserId(userId).stream()
                .map(w -> w.getProduct().getId())
                .collect(Collectors.toList());
    }

    @Transactional
    public WishlistToggleResponseDto toggleWishlist(String userId, String productId) {
        if (userId == null) {
            return WishlistToggleResponseDto.builder()
                    .saved(true)
                    .productId(productId)
                    .wishlistProductIds(List.of(productId))
                    .build();
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> ApiException.notFound("User not found"));

        Product product = productRepository.findById(productId)
                .or(() -> productRepository.findBySlug(productId))
                .orElseThrow(() -> ApiException.notFound("Product not found with ID or slug: " + productId));

        Optional<Wishlist> existing = wishlistRepository.findByUserIdAndProductId(userId, product.getId());

        boolean saved;
        if (existing.isPresent()) {
            wishlistRepository.delete(existing.get());
            saved = false;
        } else {
            Wishlist newEntry = Wishlist.builder()
                    .id("wsh-" + UUID.randomUUID().toString().substring(0, 8))
                    .user(user)
                    .product(product)
                    .build();
            wishlistRepository.save(newEntry);
            saved = true;
        }

        List<String> currentIds = wishlistRepository.findByUserId(userId).stream()
                .map(w -> w.getProduct().getId())
                .collect(Collectors.toList());

        return WishlistToggleResponseDto.builder()
                .saved(saved)
                .productId(product.getId())
                .wishlistProductIds(currentIds)
                .build();
    }
}
