/* eslint-disable react/react-in-jsx-scope */
import { Layout } from '@components/Layout'
import { AppWithStore } from '@interfaces'
import { makeStore } from '@store'
import { createWrapper } from 'next-redux-wrapper'
import { ThemeProvider } from 'next-themes'
import App, { AppContext, AppInitialProps } from 'next/app'
import '../styles/globals.css'

class Totoro extends App<AppWithStore> {
  static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    )
  }
}

const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(Totoro)
