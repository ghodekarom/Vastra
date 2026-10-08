package com.vastra.customer.repository;

import com.vastra.customer.entity.CustomerAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, String> {
    List<CustomerAddress> findByUserId(String userId);
}
