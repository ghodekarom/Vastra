package com.vastra.customer.controller;

import com.vastra.common.response.ApiResponse;
import com.vastra.customer.dto.CustomerAddressDto;
import com.vastra.customer.dto.UserProfileDto;
import com.vastra.customer.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/account")
@RequiredArgsConstructor
@Tag(name = "Customer Account", description = "Customer Profile and Address Management Endpoints")
public class AccountController {

    private final CustomerService customerService;

    @GetMapping("/me")
    @Operation(summary = "Get authenticated customer profile")
    public ResponseEntity<ApiResponse<UserProfileDto>> getProfile(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        UserProfileDto profile = customerService.getProfile(userId);
        return ResponseEntity.ok(ApiResponse.ok(profile));
    }

    @GetMapping("/addresses")
    @Operation(summary = "Get list of customer saved addresses")
    public ResponseEntity<ApiResponse<List<CustomerAddressDto>>> getAddresses(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        List<CustomerAddressDto> addresses = customerService.getAddresses(userId);
        return ResponseEntity.ok(ApiResponse.ok(addresses));
    }

    @PostMapping("/addresses")
    @Operation(summary = "Add a new delivery address")
    public ResponseEntity<ApiResponse<CustomerAddressDto>> addAddress(
            @Valid @RequestBody CustomerAddressDto request,
            Authentication authentication
    ) {
        String userId = (String) authentication.getPrincipal();
        CustomerAddressDto created = customerService.addAddress(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(created, "Address added successfully"));
    }

    @DeleteMapping("/addresses/{id}")
    @Operation(summary = "Delete a saved delivery address")
    public ResponseEntity<ApiResponse<Void>> deleteAddress(
            @PathVariable String id,
            Authentication authentication
    ) {
        String userId = (String) authentication.getPrincipal();
        customerService.deleteAddress(userId, id);
        return ResponseEntity.ok(ApiResponse.ok(null, "Address deleted successfully"));
    }
}
