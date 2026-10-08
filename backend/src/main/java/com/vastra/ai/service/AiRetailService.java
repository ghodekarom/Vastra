package com.vastra.ai.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiRetailService {

    public String generateEditorialCopy(String productPrompt) {
        String baseName = (productPrompt != null && !productPrompt.isBlank())
                ? productPrompt.trim()
                : "Heavyweight Oversized Streetwear Tee";

        return String.format(
                "Crafted from 280 GSM organic combed cotton, the %s fuses raw brutalist streetwear aesthetics with cloud-soft breathability. " +
                "Engineered with our signature 2.5-inch dropped shoulder contour, a dense non-sag ribbed collar, and subtle archival typographic detailing. " +
                "Pre-shrunk with natural silicone enzymes for an enduring drape that commands presence without effort.",
                baseName
        );
    }

    public List<Map<String, Object>> getRetailInsights() {
        return List.of(
                Map.of(
                        "type", "INVENTORY_FORECAST",
                        "title", "Restock Urgency: Better Days Ahead Wave Tee",
                        "description", "At current run-rate of 14 units/day, inventory in Size XL will deplete in 48 hours. Projected stockout revenue loss: ₹84,000.",
                        "recommendation", "Order 120 units immediate factory replenishment."
                ),
                Map.of(
                        "type", "SENTIMENT_ANALYSIS",
                        "title", "Collar & Fit Sentiment 94% Positive",
                        "description", "Customer reviews across Horizon Collection overwhelmingly praise the non-sag 1.25-inch high-density ribbed collar after multiple washes.",
                        "recommendation", "Standardize collar specs across future Drops."
                ),
                Map.of(
                        "type", "VELOCITY_TREND",
                        "title", "Heavyweight (280–320 GSM) Velocity Surging",
                        "description", "Oversized silhouettes above 260 GSM show 2.3x higher repeat order conversion compared to standard market blanks.",
                        "recommendation", "Expand autumn drop line with 300 GSM Loopknit."
                )
        );
    }
}
