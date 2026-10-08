package com.vastra.returnorder.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReturnResponseDto {
    private String id;
    private String returnNumber;
    private String orderNumber;
    private String actionType;
    private String reason;
    private String replacementSize;
    private String status;
    private Instant createdAt;
}
