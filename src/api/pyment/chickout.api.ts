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
    throw new Error("User is not authenticated");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        "Content-Type": "application/json",
        token: token, // تأكد أن الـ Key هنا اسمه token كما تتوقع الـ API
      },
    },
  );

  // 1. استخراج البيانات أولاً باستخدام await
  const res = await response.json();

  // 2. التحقق من النجاح أو الفشل باستخدام البيانات المستخرجة
  if (!response.ok) {
    // الآن res.message ستعمل بدون ReferenceError
    throw new Error(res.message || "Failed to create checkout session");
  }

  console.log("payment data", res);
  return res;
}
