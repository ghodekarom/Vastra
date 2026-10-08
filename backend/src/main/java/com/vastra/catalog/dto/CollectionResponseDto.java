package com.vastra.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollectionResponseDto {
    private String id;
    private String title;
    private String slug;
    private long count;
    private String image;
    private String description;
    private String gsmRange;
}
