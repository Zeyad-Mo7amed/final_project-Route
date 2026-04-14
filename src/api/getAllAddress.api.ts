export async function getAllAddress(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}addresses`, {
      headers: {
        "Content-Type": "application/json",
        token: token, 
      },
      cache: "no-store", 
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to get addresses");
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
