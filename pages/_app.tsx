import { Layout } from '@components/Layout'
import { AuthProvider } from '@providers/Auth'
import { NextPageContext } from 'next'
import { getSession, Provider } from 'next-auth/client'
import { ThemeProvider } from 'next-themes'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import React from 'react'
import { ToastProvider } from 'react-toast-notifications'
import '../styles/globals.css'

interface AuthAppProps extends AppProps {
  authenticated: boolean
}

const Totoro = ({ Component, pageProps, authenticated }: AuthAppProps): React.ReactElement => {
  return (
    <Provider
      session={pageProps.session}
      // options={{
      //   clientMaxAge: 60,
      //   keepAlive: 5 * 60,
      // }}
    >
      <AuthProvider authenticated={authenticated}>
        <ThemeProvider attribute="class">
          <ToastProvider autoDismiss autoDismissTimeout={6000} placement="bottom-right">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  )
}

Totoro.getInitialProps = async (
  context: unknown
): Promise<AppInitialProps & { authenticated: boolean }> => {
  const session = await getSession(context as NextPageContext)

  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(context as AppContext)

  return { ...appProps, authenticated: !!session }
}

// export const getServerSiderProps = async (
//   context
// ): Promise<AppInitialProps & { authenticated: boolean }> => {
//   const session = await getSession(context)
//   // Call the page's `getInitialProps` and fill `appProps.pageProps`
//   const appProps = await App.getInitialProps(context)

//   return { ...appProps, authenticated: !!session }
// }

export default Totoro
