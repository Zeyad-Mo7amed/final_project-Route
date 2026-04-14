
export async function getAllCart({ token }: { token?: string }) {

  
  if (!token) {
    throw new Error("User is not authenticated");
  }

  const data = await fetch(`${process.env.NEXT_PUBLIC_API}cart`, {
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload = await data.json();
  console.log(payload);
  return payload;
}