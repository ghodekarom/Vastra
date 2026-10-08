package com.vastra.support.controller;

import com.vastra.common.response.ApiResponse;
import com.vastra.support.dto.CreateSupportInquiryDto;
import com.vastra.support.service.SupportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/support")
@RequiredArgsConstructor
@Tag(name = "Support", description = "Customer Support and Inquiry Endpoints")
public class SupportController {

    private final SupportService supportService;

    @PostMapping("/inquiries")
    @Operation(summary = "Submit a customer support contact inquiry")
    public ResponseEntity<ApiResponse<Void>> submitInquiry(@Valid @RequestBody CreateSupportInquiryDto request) {
        supportService.submitInquiry(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(null, "Your inquiry has been received. Our team will contact you within 24 hours."));
    }
}
