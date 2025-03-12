import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
            }),
            });

            const user = await res.json();

            console.log('user', user, user.error);

            if (!res.ok || !user.AuthenticationResult.AccessToken) {
                // If login failed, return an error message
                throw new Error(user?.error || '');
            }

            // TODO: probably want to refine the return result because AuthenticationResult is messy
            if (user?.AuthenticationResult.AccessToken) {
            return {
                // TODO: once the backend includes the user data, ensure this includes the whole user
                ...user, // this likely needs to be changed to user.user or something
                accessToken: user.AuthenticationResult.AccessToken,
                refreshToken: user.AuthenticationResult.RefreshToken,
            };
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.error(e);
            // Catch any errors and throw a more descriptive error
            throw new Error(e.message || "Authentication failed. Please try again.");
        }

      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      //   TODO: refresh token

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
