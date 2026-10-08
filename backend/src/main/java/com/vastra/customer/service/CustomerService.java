package com.vastra.customer.service;

import com.vastra.auth.entity.User;
import com.vastra.auth.repository.UserRepository;
import com.vastra.common.exception.ApiException;
import com.vastra.customer.dto.CustomerAddressDto;
import com.vastra.customer.dto.UserProfileDto;
import com.vastra.customer.entity.CustomerAddress;
import com.vastra.customer.repository.CustomerAddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final UserRepository userRepository;
    private final CustomerAddressRepository addressRepository;

    @Transactional(readOnly = true)
    public UserProfileDto getProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ApiException.notFound("Customer account not found"));
        return UserProfileDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .role(user.getRole())
                .build();
    }

    @Transactional(readOnly = true)
    public List<CustomerAddressDto> getAddresses(String userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CustomerAddressDto addAddress(String userId, CustomerAddressDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ApiException.notFound("Customer account not found"));

        CustomerAddress address = CustomerAddress.builder()
                .id("addr-" + UUID.randomUUID().toString().substring(0, 8))
                .user(user)
                .fullName(dto.getFullName())
                .phone(dto.getPhone())
                .street(dto.getStreet())
                .city(dto.getCity())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .isDefault(dto.isDefault())
                .build();

        CustomerAddress saved = addressRepository.save(address);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteAddress(String userId, String addressId) {
        CustomerAddress address = addressRepository.findById(addressId)
                .orElseThrow(() -> ApiException.notFound("Address not found"));

        if (!address.getUser().getId().equals(userId)) {
            throw ApiException.unauthorized("Unauthorized to delete address");
        }
        addressRepository.delete(address);
    }

    private CustomerAddressDto mapToDto(CustomerAddress address) {
        return CustomerAddressDto.builder()
                .id(address.getId())
                .fullName(address.getFullName())
                .phone(address.getPhone())
                .street(address.getStreet())
                .city(address.getCity())
                .state(address.getState())
                .pincode(address.getPincode())
                .isDefault(address.isDefault())
                .build();
    }
}
