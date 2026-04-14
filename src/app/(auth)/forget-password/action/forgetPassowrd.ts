export async function sendResetEmail(email: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message || res.statusText);
    }

    return res.json();
  } catch (err: unknown) {
    throw new Error((err as Error).message || "Failed to send code");
  }
}

export async function verifyResetCode(resetCode: number | string) {
  if (!resetCode) throw new Error("Please enter the reset code");

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode: resetCode.toString() }), // تحويل الرقم لسلسلة
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      error?.message || res.statusText || "Failed to verify code",
    );
  }

  return res.json();
}

export async function changePassword(email: string, newPassword: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: newPassword, 
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to reset password");
    }

    return data;
  } catch (err: unknown) {
    throw new Error((err as Error).message || "An error occurred");
  }
}
