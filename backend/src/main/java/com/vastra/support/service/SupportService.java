package com.vastra.support.service;

import com.vastra.support.dto.CreateSupportInquiryDto;
import com.vastra.support.entity.SupportInquiry;
import com.vastra.support.repository.SupportInquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class SupportService {

    private final SupportInquiryRepository supportInquiryRepository;

    @Transactional
    public void submitInquiry(CreateSupportInquiryDto dto) {
        SupportInquiry inquiry = SupportInquiry.builder()
                .id(UUID.randomUUID().toString())
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .status("OPEN")
                .build();

        supportInquiryRepository.save(inquiry);
        log.info("Received customer support inquiry from {}: {}", dto.getEmail(), dto.getSubject());
    }
}
