"use server";
import { getTokenFn } from "@/utlities/getTokenFn";
interface ShippingAddressInterface {
  details: string;
  phone: string;
  city: string;
}
export async function cashPayment(
  cartId: string,
  shippingAddress: ShippingAddressInterface,
) {
  const token = await getTokenFn();

  if (!token) {
    throw new Error("عفواً، يجب تسجيل الدخول أولاً لإتمام عملية الدفع.");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API;

  if (!baseUrl) {
    throw new Error("Environment variable API is missing!");
  }

  try {
    const response = await fetch(`${baseUrl}orders/${cartId}`, {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || "فشلت عملية إتمام الطلب، حاول مرة أخرى.");
    }

    console.log("✅ Cash Order Created Successfully");

    return res;
  } catch (error: any) {
    console.error("❌ Cash Payment Error:", error.message);
    throw new Error(error.message || "حدث خطأ غير متوقع أثناء معالجة الدفع.");
  }
}
