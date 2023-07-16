import '@/styles/globals.css'
import Layout from "../components/Layout";
import LoginWrapper from "../components/LoginWrapper";
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }) {
  return (
      <Layout>
          <SessionProvider session={pageProps.session}>
            <LoginWrapper>
              <Component {...pageProps} />
            </LoginWrapper>
          </SessionProvider>
      </Layout>
  );
}
