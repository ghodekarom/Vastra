package com.vastra.ai.controller;

import com.vastra.ai.service.AiRetailService;
import com.vastra.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/ai")
@RequiredArgsConstructor
@Tag(name = "AI Retail Intelligence", description = "Decision Support Engine: Copywriting, Demand Prediction, and Sentiment")
public class AiRetailController {

    private final AiRetailService aiRetailService;

    @PostMapping("/generate-copy")
    @Operation(summary = "Generate editorial copy for luxury oversized garment drop")
    public ResponseEntity<ApiResponse<String>> generateCopy(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");
        String copy = aiRetailService.generateEditorialCopy(prompt);
        return ResponseEntity.ok(ApiResponse.ok(copy));
    }

    @GetMapping("/insights")
    @Operation(summary = "Get retail intelligence digest (demand forecasts, review sentiment, velocity)")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getInsights() {
        List<Map<String, Object>> insights = aiRetailService.getRetailInsights();
        return ResponseEntity.ok(ApiResponse.ok(insights));
    }
}
