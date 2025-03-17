import { BaseUser } from "@/app/schemas/User";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    user?: BaseUser;
  }

  interface User {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    user?: BaseUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    user?: BaseUser;
  }
}
