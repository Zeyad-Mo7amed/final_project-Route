"use server";

import { getTokenFn } from "@/utlities/getTokenFn";

interface ShippingAddressInterface {
  details: string;
  phone: string;
  city: string;
}


export async function onlinePayemnt(
  cartId: string,
  shippingAddress: ShippingAddressInterface,
) {
  const token = await getTokenFn();

  if (!token) {
    throw new Error("عفواً، يجب تسجيل الدخول أولاً لإتمام عملية الدفع.");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API;
  const returnUrl = process.env.NEXTAUTH_URL; 

  if (!baseUrl || !returnUrl) {
    throw new Error("Environment variables (API or Return URL) are missing!");
  }

  try {
    const response = await fetch(
      `${baseUrl}orders/checkout-session/${cartId}?url=${returnUrl}`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      },
    );

    const res = await response.json();

    if (!response.ok) {
      throw new Error(
        res.message ||
         "فشلت عملية إنشاء جلسة الدفع، حاول مرة أخرى.",
      );
    }

    console.log("✅ Payment Session Created:", res.session.url);

    return res;
  } catch (error: any) {
    console.error("❌ Online Payment Error:", error.message);
    throw new Error(error.message || "حدث خطأ غير متوقع أثناء معالجة الدفع.");
  }
}
