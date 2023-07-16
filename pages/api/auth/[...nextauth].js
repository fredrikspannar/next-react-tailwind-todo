import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
pages: {
    signIn: "/signin",
    },    
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
    session: async (session, user) => {
        console.log('auth provider callback with user = ',user);
      session.id = user.id;
      return Promise.resolve(session);
    },
  }, 
};

export default NextAuth(authOptions);
