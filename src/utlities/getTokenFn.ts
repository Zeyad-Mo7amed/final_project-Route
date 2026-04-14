import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFn(): Promise<string > { 

  const cookie = await cookies();
  console.log(cookie);
  
  const nexAuthCookie = cookie.get("next-auth.session-token")?.value;
  const decodeCookie = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: nexAuthCookie,
  });
  console.log("decodeCookie", decodeCookie);
  return decodeCookie?.token as string;
}
