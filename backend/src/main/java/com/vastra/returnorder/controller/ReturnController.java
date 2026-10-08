package com.vastra.returnorder.controller;

import com.vastra.common.response.ApiResponse;
import com.vastra.returnorder.dto.CreateReturnRequestDto;
import com.vastra.returnorder.dto.ReturnResponseDto;
import com.vastra.returnorder.service.ReturnService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Returns & Exchanges", description = "Reverse Logistics, 7-Day Size Exchanges and Refund Processing")
public class ReturnController {

    private final ReturnService returnService;

    @PostMapping("/orders/{orderId}/returns")
    @Operation(summary = "Submit a return or size exchange request for an eligible order")
    public ResponseEntity<ApiResponse<ReturnResponseDto>> createReturn(
            @PathVariable String orderId,
            @Valid @RequestBody CreateReturnRequestDto request
    ) {
        ReturnResponseDto result = returnService.createReturn(orderId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(result, "Return request submitted successfully"));
    }

    @GetMapping("/admin/returns")
    @Operation(summary = "Admin endpoint to list all customer return and size exchange requests")
    public ResponseEntity<ApiResponse<List<ReturnResponseDto>>> getAdminReturns() {
        List<ReturnResponseDto> list = returnService.getAllReturns();
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @PatchMapping("/admin/returns/{returnNumber}/status")
    @Operation(summary = "Admin endpoint to approve, schedule pickup, or reject return request")
    public ResponseEntity<ApiResponse<ReturnResponseDto>> updateReturnStatus(
            @PathVariable String returnNumber,
            @RequestBody Map<String, String> body
    ) {
        String newStatus = body.getOrDefault("status", "APPROVED");
        ReturnResponseDto updated = returnService.updateReturnStatus(returnNumber, newStatus);
        return ResponseEntity.ok(ApiResponse.ok(updated, "Return status updated to " + newStatus));
    }
}
