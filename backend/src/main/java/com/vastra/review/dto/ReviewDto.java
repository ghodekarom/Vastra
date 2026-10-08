package com.vastra.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private String id;
    private String userName;
    private int rating;
    private String comment;
    private boolean verifiedBuyer;
    private Instant createdAt;
}
