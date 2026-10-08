package com.vastra.review.entity;

import com.vastra.catalog.entity.Product;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Review {

    @Id
    @Column(length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "user_name", nullable = false, length = 150)
    private String userName;

    @Column(nullable = false)
    private int rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(name = "is_verified_buyer", nullable = false)
    @Builder.Default
    private boolean verifiedBuyer = true;

    @Column(name = "is_approved", nullable = false)
    @Builder.Default
    private boolean approved = true;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}
