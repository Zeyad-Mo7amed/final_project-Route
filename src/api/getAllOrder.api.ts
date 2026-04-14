"use server";
import { getTokenFn } from "@/utlities/getTokenFn";
import { jwtDecode } from "jwt-decode";

export async function getAllOrder() {
  const token = await getTokenFn();

  // 1. التأكد من وجود التوكن
  if (!token) {
    return { message: "No token found", status: "error" };
  }

  try {
    // 2. فك التوكن واستخراج الـ id
    // في الـ Payload بتاع RouteMisr الـ ID بيكون غالبا في خاصية اسمها id
    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    // 3. الطلب من الـ API باستخدام الـ ID المستخرج
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        method: "GET",
        // ملاحظة: الـ Orders API في RouteMisr أحياناً لا يتطلب Headers لجلب الطلبات
        // طالما الـ ID موجود في الـ URL، لكن يفضل دائماً التحقق من التوثيق.
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const payload = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return { message: "Error occurred while fetching orders", status: "error" };
  }
}
