package com.vastra.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedResponse<T> {

    private List<T> items;
    private long total;
    private int page;
    private int pageSize;
    private int totalPages;
    private boolean hasMore;

    public static <T> PaginatedResponse<T> of(List<T> items, long total, int page, int pageSize) {
        int totalPages = pageSize > 0 ? (int) Math.ceil((double) total / pageSize) : 0;
        boolean hasMore = (page + 1) < totalPages;

        return PaginatedResponse.<T>builder()
                .items(items)
                .total(total)
                .page(page)
                .pageSize(pageSize)
                .totalPages(totalPages)
                .hasMore(hasMore)
                .build();
    }
}
