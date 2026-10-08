package com.vastra.returnorder.repository;

import com.vastra.returnorder.entity.ReturnRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, String> {
    List<ReturnRequest> findByOrderId(String orderId);
    Optional<ReturnRequest> findByReturnNumber(String returnNumber);
}
