"use server";

import { getTokenFn } from "@/utlities/getTokenFn";

// تعريف الواجهة لبيانات الشحن
interface ShippingAddressInterface {
  details: string;
  phone: string;
  city: string;
}

/**
 * وظيفة إنشاء جلسة الدفع أونلاين
 * @param cartId - معرف العربة الخاص بالمستخدم
 * @param shippingAddress - بيانات العنوان (تفاصيل، هاتف، مدينة)
 */
export async function onlinePayemnt(
  cartId: string,
  shippingAddress: ShippingAddressInterface,
) {
  // 1. الحصول على التوكن من الـ Server Side
  const token = await getTokenFn();

  // 2. التحقق من وجود التوكن (حماية إضافية)
  if (!token) {
    throw new Error("عفواً، يجب تسجيل الدخول أولاً لإتمام عملية الدفع.");
  }

  // 3. التحقق من وجود المتغيرات البيئية المطلوبة
  const baseUrl = process.env.NEXT_PUBLIC_API; // https://ecommerce.routemisr.com/api/v1/
  const returnUrl = process.env.NEXTAUTH_URL; // اللي هنغيره في Vercel لرابط الموقع

  if (!baseUrl || !returnUrl) {
    throw new Error("Environment variables (API or Return URL) are missing!");
  }

  try {
    // 4. إرسال الطلب للسيرفر لفتح جلسة دفع
    // الـ API الخاص بـ Route سيقوم تلقائياً بإضافة /allorders بعد الـ URL المبعوث
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

    // 5. التحقق من نجاح الرد من السيرفر
    if (!response.ok) {
      throw new Error(
        res.message || "فشلت عملية إنشاء جلسة الدفع، حاول مرة أخرى.",
      );
    }

    // 6. طباعة البيانات للتأكد في الـ Terminal (Server Logs)
    console.log("✅ Payment Session Created:", res.session.url);

    // 7. إرجاع النتيجة (التي تحتوي على رابط Stripe)
    return res;
  } catch (error: any) {
    console.error("❌ Online Payment Error:", error.message);
    throw new Error(error.message || "حدث خطأ غير متوقع أثناء معالجة الدفع.");
  }
}
