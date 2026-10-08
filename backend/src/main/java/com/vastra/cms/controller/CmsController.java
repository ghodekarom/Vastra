package com.vastra.cms.controller;

import com.vastra.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/cms")
@Tag(name = "CMS & Editorial", description = "Brand Ethos, Editorial Stories, and Frequently Asked Questions")
public class CmsController {

    @GetMapping("/faqs")
    @Operation(summary = "Get categorized FAQs for customer self-service")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getFaqs() {
        List<Map<String, Object>> faqs = List.of(
                Map.of(
                        "category", "Sizing & Fit",
                        "items", List.of(
                                Map.of(
                                        "q", "How do VASTRA oversized t-shirts fit compared to regular tees?",
                                        "a", "Our oversized tees are engineered with extended dropped shoulders, broader chests, and proportional length. We recommend buying your true size for our signature relaxed streetwear drape, or sizing down if you prefer a standard tailored fit."
                                ),
                                Map.of(
                                        "q", "Where can I find the precise garment dimensions?",
                                        "a", "Every product page includes an interactive size guide modal showing chest circumference, garment length, and sleeve opening in both inches and centimeters."
                                )
                        )
                ),
                Map.of(
                        "category", "Fabric & GSM Care",
                        "items", List.of(
                                Map.of(
                                        "q", "What does 240–320 GSM mean?",
                                        "a", "GSM stands for Grams per Square Meter, measuring fabric density. Traditional t-shirts range from 140–180 GSM. Our garments use heavy 240 to 320 GSM combed cotton and French Terry for substantial drape, zero transparency, and exceptional durability."
                                ),
                                Map.of(
                                        "q", "How should I wash and care for heavyweight cotton?",
                                        "a", "Machine wash cold inside-out with similar colors. Avoid bleach and tumble drying. Dry flat in shade and cool iron on the reverse side to preserve fabric density and high-density screen prints."
                                )
                        )
                ),
                Map.of(
                        "category", "Shipping & Delivery",
                        "items", List.of(
                                Map.of(
                                        "q", "What are the shipping charges and delivery timelines?",
                                        "a", "We offer Free Standard Delivery across India on all orders of ₹1,999 and above. Orders below ₹1,999 incur a flat ₹99 fee. Express delivery is available for ₹199. Metro deliveries typically arrive within 2–3 business days."
                                ),
                                Map.of(
                                        "q", "Which courier partners do you use?",
                                        "a", "We partner with Blue Dart Express and Delhivery Air for Pan-India insured delivery with live SMS and WhatsApp tracking updates."
                                )
                        )
                ),
                Map.of(
                        "category", "Returns & Exchanges",
                        "items", List.of(
                                Map.of(
                                        "q", "What is your return and size exchange policy?",
                                        "a", "We provide a hassle-free 7-day return and size exchange window from the delivery date. Items must be unworn, unwashed, and retained with original tags and packaging."
                                ),
                                Map.of(
                                        "q", "How long does a refund take to process?",
                                        "a", "Once the return package is collected and passes our studio quality check, refunds are initiated within 48 hours back to the original payment source or UPI."
                                )
                        )
                )
        );

        return ResponseEntity.ok(ApiResponse.ok(faqs));
    }
}
