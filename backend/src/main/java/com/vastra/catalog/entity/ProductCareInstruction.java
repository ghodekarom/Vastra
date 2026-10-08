package com.vastra.catalog.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_care_instructions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCareInstruction {

    @Id
    @Column(length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, length = 255)
    private String instruction;

    @Column(name = "display_order")
    @Builder.Default
    private int displayOrder = 0;
}
