import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const authOptions = {
    /*pages: {
        signIn: "/signin",
        },    */
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID,
            clientSecret: process.env.GOOGLE_OAUTH_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, user, token }) {
    
            const userEmail = user?.email || session.user?.email;
            const userName = user?.name || session.user?.name;

            try {
                // query if does the user exist?
                const dbUser = await prisma.user.findFirst(
                        {
                            where: { 'email': userEmail }
                        });

                // did it exist?
                if ( !dbUser || dbUser === null ) {
                    // no, create!
                    const createdUser = await prisma.user.create(
                                                {
                                                    data: { 'email': userEmail, 'name': userName }
                                                });

                    // attach our own user id
                    session.userId = createdUser.id;

                } else {
                    // attach our own user id
                    session.userId = dbUser.id;
                }

            } catch(e) { console.error("Auth provider callback session failed! Error: ",e); }

            return session;
        }
    }
};

export default NextAuth(authOptions);
