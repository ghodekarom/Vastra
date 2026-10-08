// Razorpay Frontend Client Utility for VASTRA

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
}

export interface RazorpaySuccessHandlerArgs {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface OpenRazorpayOptions {
  orderId: string;
  amount: number; // in INR rupees
  name?: string;
  description?: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess: (response: RazorpaySuccessHandlerArgs) => void;
  onDismiss?: () => void;
  onError?: (error: any) => void;
}

/**
 * Dynamically loads the official Razorpay Checkout SDK script
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById("razorpay-checkout-js");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Initiates Razorpay Checkout modal
 */
export const launchRazorpayPayment = async (options: OpenRazorpayOptions) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    throw new Error("Unable to load Razorpay Checkout SDK. Please check your network connection.");
  }

  // 1. Fetch Razorpay Order from server API
  const createOrderRes = await fetch("/api/razorpay/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: options.amount,
      currency: "INR",
      receipt: options.orderId,
      notes: {
        vastra_order_id: options.orderId,
        customer_name: options.customerName,
      },
    }),
  });

  const orderData = await createOrderRes.json();
  if (!orderData.success) {
    throw new Error(orderData.message || "Failed to initialize Razorpay transaction.");
  }

  const razorpayKey = orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder";

  const razorpayOptions = {
    key: razorpayKey,
    amount: orderData.order.amount,
    currency: orderData.order.currency || "INR",
    name: "VASTRA STREETWEAR",
    description: options.description || `Order #${options.orderId} • Heavyweight Streetwear`,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=120&auto=format&fit=crop&q=80",
    order_id: orderData.order.id,
    handler: options.onSuccess,
    prefill: {
      name: options.customerName,
      email: options.customerEmail || "customer@vastra.in",
      contact: options.customerPhone || "9876543210",
    },
    notes: {
      address: "VASTRA Indiranagar Flagship Studio, Bengaluru",
      vastraOrderId: options.orderId,
    },
    theme: {
      color: "#111111", // VASTRA Obsidian Black
      backdrop_color: "#F7F4EE",
    },
    modal: {
      ondismiss: () => {
        if (options.onDismiss) {
          options.onDismiss();
        }
      },
    },
  };

  const rzp = new (window as any).Razorpay(razorpayOptions);
  rzp.on("payment.failed", (response: any) => {
    if (options.onError) {
      options.onError(response.error);
    }
  });
  rzp.open();
};
