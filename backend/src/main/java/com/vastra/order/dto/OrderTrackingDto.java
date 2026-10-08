package com.vastra.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderTrackingDto {
    private String orderNumber;
    private String status;
    private String trackingNumber;
    private String courierPartner;
    private String estimatedDelivery;
    private List<TrackingMilestoneDto> timeline;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TrackingMilestoneDto {
        private String title;
        private String description;
        private String date;
        private boolean completed;
        private boolean active;
    }
}
