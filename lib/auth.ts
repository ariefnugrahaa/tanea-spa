import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      id: string;
      username?: string;
      role: string;
    } & {
      [key: string]: any;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
  }
}

// DEMO MODE: Simple in-memory auth for testing without PostgreSQL
// For production with PostgreSQL, use PrismaAdapter and database
const demoUsers = [
  {
    id: 'demo-admin-id',
    username: 'admin',
    password: 'admin123',
    role: 'SUPER_ADMIN',
  },
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // DEMO MODE: Simple password check
        const demoUser = demoUsers.find(
          u => u.username === credentials.username && u.password === credentials.password
        );

        if (demoUser) {
          return {
            id: demoUser.id,
            username: demoUser.username,
            role: demoUser.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
