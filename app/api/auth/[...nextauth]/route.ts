import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await res.json();
          const { result, user, children } = data;

          if (!res.ok || !result.AccessToken) {
            throw new Error(
              data?.error || "Failed to Login. Please try again."
            );
          }

          if (children) {
            user.children = children;
          }

          if (result?.AccessToken) {
            return {
              user,
              accessToken: result.AccessToken,
              refreshToken: result.RefreshToken,
              idToken: result.IdToken,
              ...result,
            };
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          console.error(e);
          // Catch any errors and throw a more descriptive error
          throw new Error(
            e.message || "Authentication failed. Please try again."
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.user = session.user;
      }
      if (user) {
        token = {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          idToken: user.idToken,
          user: user.user,
        };
      }
      //   TODO: refresh token

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.idToken = token.idToken;
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
