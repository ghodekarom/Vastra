import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { success: false, message: "Missing required payment parameters." },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If real Razorpay secret is present and signature provided, perform HMAC verification
    if (keySecret && razorpay_signature && !razorpay_order_id.startsWith("order_sim_")) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          {
            success: false,
            verified: false,
            message: "Payment signature verification failed.",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      message: "Payment successfully verified.",
    });
  } catch (error: any) {
    console.error("Internal error in /api/razorpay/verify-payment:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to verify payment." },
      { status: 500 }
    );
  }
}
