package com.vastra.returnorder.entity;

import com.vastra.order.entity.Order;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Table(name = "return_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ReturnRequest {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "return_number", nullable = false, unique = true, length = 50)
    private String returnNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "action_type", nullable = false, length = 50)
    private String actionType; // REFUND, EXCHANGE

    @Column(nullable = false, length = 255)
    private String reason;

    @Column(name = "replacement_size", length = 20)
    private String replacementSize;

    @Column(nullable = false, length = 50)
    @Builder.Default
    private String status = "REQUESTED"; // REQUESTED, APPROVED, PICKUP_SCHEDULED, COMPLETED, REJECTED

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;
}
