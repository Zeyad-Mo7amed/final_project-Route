"use server";

import { getTokenFn } from "@/utlities/getTokenFn";

interface ShippingAddressInterface {
  details: string;
  phone: string;
  city: string;
}

export async function onlinePayment(
  cartId: string,
  shippingAddress: ShippingAddressInterface,
) {
  const token = await getTokenFn();

  if (!token) {
    throw new Error("You must be logged in to complete the payment.");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API;

  // نستخدم الـ BASE_URL اللي إنت حاطه للمشروع على فيرسل
  // لو مش موجود بنستخدم الـ NEXTAUTH_URL (بعد ما نصلحه في الإعدادات)
  const siteUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  if (!baseUrl) {
    throw new Error("Environment variables (API) are missing!");
  }

  // تنظيف الرابط لضمان عدم وجود "/" متكررة أو مسافات
  const cleanSiteUrl = siteUrl.replace(/\/$/, "");
  const returnUrl = `${cleanSiteUrl}/allorders`;

  try {
    // مهم جداً: عمل encodeURIComponent للـ returnUrl عشان الـ API يقبله كـ parameter صح
    const finalApiUrl = `${baseUrl}orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`;

    const response = await fetch(finalApiUrl, {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || "Failed to create payment session.");
    }

    // بنرجع الـ response كامل عشان تاخد منه الـ session url وتعمل redirect
    return res;
  } catch (error: any) {
    console.error("❌ Online Payment Error:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}
