package com.vastra.returnorder.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateReturnRequestDto {

    @NotBlank(message = "Action type (REFUND or EXCHANGE) is required")
    private String actionType;

    @NotBlank(message = "Reason is required")
    private String reason;

    private String replacementSize;
}
