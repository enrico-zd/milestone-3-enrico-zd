import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


async function getUsers() {
    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/users");
    
        if(!response.ok){
            throw new Error('Failed to fetch user product');
        }
    
        return response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the login form
            name: "Credentials",
            // The credentials is used to generate a suitable form on the login page
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter password",
                },
            },
            async authorize(credentials) {
                // simple email/password check 
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const users = await getUsers();
                const user = users.find((user: { email: string }) => user.email === credentials.email);

                // Check if user exists and password matches
                if (user && user.password === credentials.password) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar,
                    }
                }

                // if authentication fails
                return null;
            },
        }),
    ],
    callbacks: {
        // Add role to session
        async session({ session, token }) {
            if (session.user && token.role) {
                session.user.role = token.role as string;
                session.user.avatar = token.avatar as string;
            }
            return session;
        },

        // Add role to token
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.avatar = user.avatar;
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret:
        process.env.NEXTAUTH_SECRET || "your-secret-key-for-jwt-encryption",
};