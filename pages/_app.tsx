import { Layout } from '@components/Layout'
import axiosInstance from '@config/axios-config'
import { useStore } from '@store'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import '../styles/globals.css'

const Totoro = ({ Component, pageProps }: AppProps): React.ReactElement => {
  // async function getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
  //   const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

  //   return { pageProps }
  // }

  const store = useStore(pageProps.initialReduxState)

  const router = useRouter()

  useEffect(() => {
    axiosInstance('/api/user/whoami/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => console.log(res.data))
      .catch(() => {
        router.push('/login')
      })
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default Totoro
