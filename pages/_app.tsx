import Layout from '@components/Layout'
import { AuthProvider } from '@providers/Auth'
import { NextPageContext } from 'next'
import { Session } from 'next-auth'
import { getSession, Provider } from 'next-auth/client'
import { ThemeProvider } from 'next-themes'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
interface AuthAppProps extends AppProps {
  session: Session
}

const Totoro = ({ Component, pageProps, session }: AuthAppProps): React.ReactElement => {
  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 60,
        keepAlive: 6 * 60,
      }}
    >
      <AuthProvider authenticated={!!session}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          limit={2}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </Provider>
  )
}

Totoro.getInitialProps = async (
  context: unknown
): Promise<AppInitialProps & { session: Session | null }> => {
  const session = await getSession(context as NextPageContext)
  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(context as AppContext)

  return { ...appProps, session }
}

// export const getServerSiderProps = async (
//   context: unknown
// ): Promise<AppInitialProps & { authenticated: boolean }> => {
//   const session = await getSession(context as NextPageContext)
//   // Call the page's `getInitialProps` and fill `appProps.pageProps`
//   const appProps = await App.getInitialProps(context as AppContext)
//   setAuthToken(session?.accessToken as string)

//   return { ...appProps, authenticated: !!session }
// }

export default Totoro
