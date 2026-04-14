export interface AddressPayload {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export const addAddress = async (data: AddressPayload , token:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to add address");
    }
    console.log(result);
    
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
