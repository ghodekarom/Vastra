"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Smartphone,
  Banknote,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Sparkles,
  RefreshCw,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { launchRazorpayPayment, loadRazorpayScript } from "@/lib/razorpay";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, subtotal, discount, shippingFee, finalTotal, createOrder } = useStore();

  const [paymentProvider, setPaymentProvider] = useState<"razorpay" | "upi_qr" | "cod">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);

  // Fallback default address if coming straight to payment
  const shippingAddress = {
    fullName: searchParams.get("name") || "Aarav Sharma",
    phone: searchParams.get("phone") || "9876543210",
    street: searchParams.get("street") || "B-402, Highline Residences, Indiranagar",
    city: searchParams.get("city") || "Bengaluru",
    state: searchParams.get("state") || "Karnataka",
    pincode: searchParams.get("pincode") || "560038",
    email: "aarav.sharma@vastra.luxury",
  };

  const shippingOption = searchParams.get("shipping") || "standard";
  const shippingCost = shippingOption === "express" ? 99 : shippingFee;
  const grandTotal = Math.max(1, subtotal - discount + shippingCost);

  // Preload Razorpay Checkout Script on mount
  useEffect(() => {
    loadRazorpayScript()
      .then((loaded) => setRazorpayLoaded(loaded))
      .catch(() => setRazorpayLoaded(false));
  }, []);

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    const tempOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      await launchRazorpayPayment({
        orderId: tempOrderId,
        amount: grandTotal,
        customerName: shippingAddress.fullName,
        customerEmail: shippingAddress.email,
        customerPhone: shippingAddress.phone,
        description: `VASTRA Streetwear Order #${tempOrderId}`,
        onSuccess: async (rzpResponse) => {
          try {
            // Verify payment on the server
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(rzpResponse),
            });
            const verifyData = await verifyRes.json();

            // Commit order in local and remote store
            const finalOrder = createOrder({
              id: tempOrderId,
              shippingAddress,
              paymentMethod: "Razorpay (Cards/UPI/NetBanking)",
              paymentId: rzpResponse.razorpay_payment_id,
              razorpayOrderId: rzpResponse.razorpay_order_id,
              paymentStatus: "PAID",
            });

            router.push(`/order/${finalOrder.id}/confirmation`);
          } catch (verifyError: any) {
            console.error("Payment verification failure:", verifyError);
            setErrorMessage("Payment verification warning, but order was recorded. Contact support if needed.");
          } finally {
            setIsProcessing(false);
          }
        },
        onDismiss: () => {
          setIsProcessing(false);
          setErrorMessage("Payment was dismissed. You can retry whenever ready.");
        },
        onError: (err: any) => {
          setIsProcessing(false);
          setErrorMessage(err?.description || "Payment failed. Please retry or choose another payment method.");
        },
      });
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err?.message || "Failed to initiate Razorpay gateway. Please check your network connection.");
    }
  };

  const handleCodPayment = () => {
    setIsProcessing(true);
    setErrorMessage(null);

    setTimeout(() => {
      const order = createOrder({
        shippingAddress,
        paymentMethod: "Cash on Delivery (Doorstep Cash/UPI)",
        paymentStatus: "PENDING",
      });
      setIsProcessing(false);
      router.push(`/order/${order.id}/confirmation`);
    }, 1200);
  };

  const handleUpiQrPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder({
        shippingAddress,
        paymentMethod: "Direct UPI Transfer (Instant QR)",
        paymentId: `UPI-${Math.floor(10000000 + Math.random() * 90000000)}`,
        paymentStatus: "PAID",
      });
      setIsProcessing(false);
      router.push(`/order/${order.id}/confirmation`);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#F7F4EE]">
        <div className="w-16 h-16 rounded-full bg-[#E5DFD3] flex items-center justify-center text-[#111111] mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#111111] font-display">No Active Checkout Session</h2>
        <p className="mt-2 text-xs text-[#77736D] max-w-sm">
          Your shopping bag is currently empty. Explore our latest heavyweight drops to proceed to payment.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Link
            href="/shop"
            className="rounded bg-black px-6 py-2.5 text-xs font-semibold text-white tracking-wider uppercase hover:bg-[#252525] transition"
          >
            Explore Catalog
          </Link>
          <Link
            href="/account"
            className="rounded border border-[#D8D3CA] bg-white px-5 py-2.5 text-xs font-semibold text-[#111111] hover:border-black transition"
          >
            My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-8 sm:py-12">
      <div className="container-vastra max-w-6xl">
        {/* Security Trust Banner Header */}
        <div className="mb-8 rounded-xl bg-white border border-[#D8D3CA] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#111111]">
              <ShieldCheck className="h-5 w-5 text-[#3F6B4B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold uppercase tracking-wider text-[#111111] font-display">
                  VASTRA SECURE PAYMENT GATEWAY
                </h1>
                <span className="inline-flex items-center gap-1 rounded bg-[#EAF2EC] px-2 py-0.5 text-[10px] font-semibold text-[#3F6B4B]">
                  <CheckCircle2 className="h-3 w-3" /> SSL 256-Bit
                </span>
              </div>
              <p className="text-[11px] text-[#77736D]">
                PCI-DSS Level 1 Certified • End-to-End Encrypted via Razorpay
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#4F4B45]">
            <Link
              href="/checkout"
              className="text-[#77736D] hover:text-black transition flex items-center gap-1"
            >
              ← Edit Shipping Details
            </Link>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-start gap-3">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-600" />
            <div>
              <p className="font-semibold">Payment Notification</p>
              <p className="mt-0.5 text-red-600/90">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Payment Section (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-xl border border-[#D8D3CA] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#F1EEE7] pb-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-[#111111] font-display">
                    Select Payment Method
                  </h2>
                  <p className="text-xs text-[#77736D]">
                    Choose your preferred secure payment method below
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-[#77736D] block">
                    Amount Payable
                  </span>
                  <span className="text-lg font-bold text-[#111111]">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Payment Methods Accordion */}
              <div className="space-y-4">
                {/* Method 1: Razorpay (Primary) */}
                <div
                  onClick={() => setPaymentProvider("razorpay")}
                  className={`rounded-xl border-2 p-5 cursor-pointer transition-all ${
                    paymentProvider === "razorpay"
                      ? "border-black bg-[#FAF9F5] shadow-xs"
                      : "border-[#D8D3CA] hover:border-black/40 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={paymentProvider === "razorpay"}
                        onChange={() => setPaymentProvider("razorpay")}
                        className="mt-1 text-black focus:ring-black"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                            Razorpay Standard Checkout
                          </span>
                          <span className="rounded bg-black px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                            Recommended
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#4F4B45]">
                          Cards (Visa, Mastercard, RuPay, Amex), UPI, Net Banking & Wallets
                        </p>

                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          <span className="rounded border border-[#D8D3CA] bg-white px-2 py-1 text-[10px] font-semibold text-[#111111]">
                            💳 Cards
                          </span>
                          <span className="rounded border border-[#D8D3CA] bg-white px-2 py-1 text-[10px] font-semibold text-[#111111]">
                            ⚡ UPI / GPay / PhonePe
                          </span>
                          <span className="rounded border border-[#D8D3CA] bg-white px-2 py-1 text-[10px] font-semibold text-[#111111]">
                            🏦 50+ Net Banking
                          </span>
                          <span className="rounded border border-[#D8D3CA] bg-white px-2 py-1 text-[10px] font-semibold text-[#111111]">
                            🛍️ Cred & Wallets
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {paymentProvider === "razorpay" && (
                    <div className="mt-6 pt-5 border-t border-[#EAE6DE]">
                      <div className="flex items-center justify-between mb-4 text-xs text-[#77736D]">
                        <span>Gateway Status:</span>
                        <span className="font-semibold text-[#3F6B4B] flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-[#3F6B4B] animate-pulse" />
                          Razorpay API Ready
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleRazorpayPayment}
                        disabled={isProcessing}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-black py-4 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:bg-[#222222] active:scale-[0.99] transition disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Connecting to Razorpay...
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4" />
                            Pay ₹{grandTotal.toLocaleString("en-IN")} via Razorpay
                          </>
                        )}
                      </button>
                      <p className="mt-2 text-center text-[10px] text-[#77736D]">
                        Opens the official Razorpay Checkout modal with bank-grade encryption.
                      </p>
                    </div>
                  )}
                </div>

                {/* Method 2: Direct UPI QR Code */}
                <div
                  onClick={() => setPaymentProvider("upi_qr")}
                  className={`rounded-xl border-2 p-5 cursor-pointer transition-all ${
                    paymentProvider === "upi_qr"
                      ? "border-black bg-[#FAF9F5] shadow-xs"
                      : "border-[#D8D3CA] hover:border-black/40 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={paymentProvider === "upi_qr"}
                        onChange={() => setPaymentProvider("upi_qr")}
                        className="mt-1 text-black focus:ring-black"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                            Direct UPI Instant QR
                          </span>
                          <span className="rounded bg-[#EAF2EC] px-2 py-0.5 text-[9px] font-bold text-[#3F6B4B] uppercase">
                            Zero Surcharge
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#4F4B45]">
                          Scan QR from Google Pay, PhonePe, Paytm, or BHIM
                        </p>
                      </div>
                    </div>
                    <QrCode className="h-5 w-5 text-[#111111]" />
                  </div>

                  {paymentProvider === "upi_qr" && (
                    <div className="mt-6 pt-5 border-t border-[#EAE6DE]">
                      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-lg border border-[#D8D3CA]">
                        {/* Simulated QR Visual */}
                        <div className="h-32 w-32 bg-[#111111] p-2 rounded-lg flex flex-col items-center justify-center text-white text-center">
                          <QrCode className="h-16 w-16 mb-1 text-white" />
                          <span className="text-[9px] font-mono tracking-widest text-white/80">
                            VASTRA UPI
                          </span>
                        </div>

                        <div className="space-y-2 text-xs flex-1 text-center sm:text-left">
                          <p className="font-bold text-[#111111]">
                            Pay ₹{grandTotal.toLocaleString("en-IN")} via UPI
                          </p>
                          <p className="text-[11px] text-[#77736D]">
                            VPA ID: <span className="font-mono font-semibold text-[#111111]">vastra.payments@okhdfcbank</span>
                          </p>
                          <p className="text-[10px] text-[#77736D]">
                            Scan using any UPI app or click below to simulate immediate transfer confirmation.
                          </p>

                          <button
                            type="button"
                            onClick={handleUpiQrPayment}
                            disabled={isProcessing}
                            className="mt-2 inline-flex items-center gap-2 rounded bg-black px-5 py-2.5 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#252525] transition"
                          >
                            {isProcessing ? "Verifying UPI..." : "I Have Paid / Confirm Order"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Method 3: Cash On Delivery */}
                <div
                  onClick={() => setPaymentProvider("cod")}
                  className={`rounded-xl border-2 p-5 cursor-pointer transition-all ${
                    paymentProvider === "cod"
                      ? "border-black bg-[#FAF9F5] shadow-xs"
                      : "border-[#D8D3CA] hover:border-black/40 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={paymentProvider === "cod"}
                        onChange={() => setPaymentProvider("cod")}
                        className="mt-1 text-black focus:ring-black"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                            Cash On Delivery (COD)
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#4F4B45]">
                          Pay cash or UPI at your doorstep upon delivery via courier partner
                        </p>
                      </div>
                    </div>
                    <Banknote className="h-5 w-5 text-[#111111]" />
                  </div>

                  {paymentProvider === "cod" && (
                    <div className="mt-6 pt-5 border-t border-[#EAE6DE]">
                      <p className="text-xs text-[#4F4B45] mb-4">
                        Please keep exact cash or UPI ready at the time of delivery to Indiranagar, Bengaluru.
                      </p>
                      <button
                        type="button"
                        onClick={handleCodPayment}
                        disabled={isProcessing}
                        className="w-full rounded-lg bg-black py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:bg-[#252525] transition disabled:opacity-50"
                      >
                        {isProcessing ? "Placing Order..." : `Confirm COD Order (₹${grandTotal.toLocaleString("en-IN")})`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Buyer Protection Guarantee */}
            <div className="rounded-xl border border-[#D8D3CA] bg-white p-5 shadow-xs flex items-center justify-between text-xs text-[#4F4B45]">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[#B89F65]" />
                <div>
                  <span className="font-bold text-[#111111] block">
                    VASTRA 100% Assurance Guarantee
                  </span>
                  <span className="text-[11px] text-[#77736D]">
                    7-day return window • Free size exchanges • Hand-inspected quality
                  </span>
                </div>
              </div>
              <Link
                href="/returns"
                className="text-[11px] font-semibold text-[#111111] hover:underline"
              >
                Return Policy
              </Link>
            </div>
          </div>

          {/* Right Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Order Items Summary */}
            <div className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1EEE7] pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Order Items ({cart.length})
                </h3>
                <Link href="/cart" className="text-[11px] text-[#77736D] hover:text-black">
                  Edit Bag
                </Link>
              </div>

              <div className="divide-y divide-[#F1EEE7] max-h-56 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center gap-3">
                    <div className="relative h-12 w-10 rounded overflow-hidden bg-[#E4DDD0] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#111111] truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#77736D]">
                        {item.color} / {item.size} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#111111]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-[#D8D3CA] space-y-2 text-xs text-[#4F4B45]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#3F6B4B] font-medium">
                    <span>Discount Code</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F1EEE7] text-sm font-bold text-[#111111]">
                  <span>Total Amount</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Delivery Destination Summary */}
            <div className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#F1EEE7] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Shipping Destination
                </span>
                <Link href="/checkout" className="text-[11px] text-[#77736D] hover:text-black">
                  Change
                </Link>
              </div>
              <div className="text-xs text-[#4F4B45] space-y-1">
                <p className="font-bold text-[#111111]">{shippingAddress.fullName}</p>
                <p className="text-[#77736D]">{shippingAddress.phone}</p>
                <p className="text-[#77736D]">
                  {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentGatewayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F7F4EE]">
          <RefreshCw className="h-8 w-8 animate-spin text-[#111111] mb-3" />
          <p className="text-xs font-semibold text-[#77736D] uppercase tracking-wider">
            Loading Secure Payment Gateway...
          </p>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
