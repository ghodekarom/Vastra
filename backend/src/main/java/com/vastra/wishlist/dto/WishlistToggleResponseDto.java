package com.vastra.wishlist.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishlistToggleResponseDto {
    private boolean saved;
    private String productId;
    private List<String> wishlistProductIds;
}
