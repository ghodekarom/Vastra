package com.vastra.returnorder.service;

import com.vastra.common.exception.ApiException;
import com.vastra.order.entity.Order;
import com.vastra.order.repository.OrderRepository;
import com.vastra.returnorder.dto.CreateReturnRequestDto;
import com.vastra.returnorder.dto.ReturnResponseDto;
import com.vastra.returnorder.entity.ReturnRequest;
import com.vastra.returnorder.repository.ReturnRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReturnService {

    private final ReturnRequestRepository returnRequestRepository;
    private final OrderRepository orderRepository;
    private final SecureRandom random = new SecureRandom();

    @Transactional
    public ReturnResponseDto createReturn(String orderIdentifier, CreateReturnRequestDto request) {
        Order order = orderRepository.findByOrderNumber(orderIdentifier)
                .or(() -> orderRepository.findById(orderIdentifier))
                .orElseThrow(() -> ApiException.notFound("Order not found: " + orderIdentifier));

        String returnNumber = "RET-" + (10000 + random.nextInt(90000));
        ReturnRequest returnRequest = ReturnRequest.builder()
                .id(UUID.randomUUID().toString())
                .returnNumber(returnNumber)
                .order(order)
                .actionType(request.getActionType().toUpperCase())
                .reason(request.getReason())
                .replacementSize(request.getReplacementSize())
                .status("REQUESTED")
                .build();

        returnRequest = returnRequestRepository.save(returnRequest);
        log.info("Created return request {} for order {}", returnNumber, order.getOrderNumber());

        return mapToDto(returnRequest);
    }

    @Transactional(readOnly = true)
    public List<ReturnResponseDto> getAllReturns() {
        return returnRequestRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReturnResponseDto updateReturnStatus(String returnIdentifier, String newStatus) {
        ReturnRequest request = returnRequestRepository.findByReturnNumber(returnIdentifier)
                .or(() -> returnRequestRepository.findById(returnIdentifier))
                .orElseThrow(() -> ApiException.notFound("Return request not found: " + returnIdentifier));

        request.setStatus(newStatus.toUpperCase());
        request = returnRequestRepository.save(request);
        return mapToDto(request);
    }

    private ReturnResponseDto mapToDto(ReturnRequest r) {
        return ReturnResponseDto.builder()
                .id(r.getId())
                .returnNumber(r.getReturnNumber())
                .orderNumber(r.getOrder().getOrderNumber())
                .actionType(r.getActionType())
                .reason(r.getReason())
                .replacementSize(r.getReplacementSize())
                .status(r.getStatus())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
