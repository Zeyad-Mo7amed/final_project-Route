import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ApplicationUser {
  name: string;
  email: string;
  id: string;
  token: string;
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    name: string;
    email: string;
    id: string;
    token: string;
  }
  interface Session {
    user: ApplicationUser;
    token: string;
  }
}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends ApplicationUser{
    /** OpenID ID Token */
  }
}