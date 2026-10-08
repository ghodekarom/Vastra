package com.vastra.catalog.repository;

import com.vastra.catalog.entity.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, String> {
    Optional<Collection> findBySlug(String slug);
}
