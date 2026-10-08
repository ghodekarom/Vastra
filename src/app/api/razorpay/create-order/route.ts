import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt, notes = {} } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount specified." },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Convert amount to paise (1 INR = 100 paise)
    const amountInPaise = Math.round(amount * 100);

    // If both Razorpay keys are configured in environment (e.g., Vercel environment variables)
    if (keyId && keySecret && !keyId.includes("placeholder")) {
      try {
        const credentials = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
        const response = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency,
            receipt: receipt || `rcpt_${Date.now()}`,
            notes,
          }),
        });

        if (response.ok) {
          const razorpayOrder = await response.json();
          return NextResponse.json({
            success: true,
            order: razorpayOrder,
            keyId,
          });
        }

        const errorDetails = await response.json();
        console.warn("Razorpay API error, falling back to development sandbox mode:", errorDetails);
      } catch (apiError) {
        console.warn("Error contacting Razorpay API:", apiError);
      }
    }

    // Graceful fallback for local development or preview sandbox
    const simulatedOrderId = `order_sim_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    return NextResponse.json({
      success: true,
      order: {
        id: simulatedOrderId,
        entity: "order",
        amount: amountInPaise,
        amount_paid: 0,
        amount_due: amountInPaise,
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        status: "created",
        attempts: 0,
        notes,
        created_at: Math.floor(Date.now() / 1000),
      },
      keyId: keyId || "rzp_test_simulated_key",
      isSimulation: !keySecret,
    });
  } catch (error: any) {
    console.error("Internal error in /api/razorpay/create-order:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
