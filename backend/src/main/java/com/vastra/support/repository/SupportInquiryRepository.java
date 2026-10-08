package com.vastra.support.repository;

import com.vastra.support.entity.SupportInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportInquiryRepository extends JpaRepository<SupportInquiry, String> {
}
