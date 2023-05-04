import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import * as Models from "sql/models"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({user}) {
            try {
                const existingUser = await Models.Users.findOne({
                    where: {
                        email: user.email
                    }
                });
        
                if (existingUser) {
                    return true;

                } else {
                    await Models.Users.create({
                        name: user.name,
                        email: user.email,
                        manager_permissions: false,
                        server_permissions: false,
                    });

                    console.log("Created row for user: ", user.email)

                    return true;
                }
            } catch (error) {
                console.error('Error creating user:', error);

                return false;
            }
        }
    }
}

export default NextAuth(authOptions)