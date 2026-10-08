package com.vastra.admin.dto;

import com.vastra.catalog.dto.ColorOptionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DropConceptDto {
    private String id;
    private String name;
    private String theme;
    private String season;
    private int gsm;
    private List<ColorOptionDto> colorPalette;
    private String targetAudience;
    private BigDecimal suggestedPrice;
    private Map<String, String> generatedCopy;
    private String mockupPrompt;
    private String mockupUrl;
}
