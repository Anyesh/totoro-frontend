import { AppProps } from 'next/app'
import '../styles/globals.css'
function Totoro({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default Totoro
