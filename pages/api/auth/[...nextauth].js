import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import users from "sql/models/users"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    secret: process.env.JWT_SECRET,

    callbacks: {
        async signIn(user, account, profile) {
            try {
                const existingUser = await users.findOne({
                    where: {
                        email: user.email
                    }
                });
        
                if (existingUser) {
                    return true;

                } else {
                    await users.create({
                        name: user.name,
                        email: user.email,
                        manager_permissions: true,
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
})