import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

const Nav = dynamic(() => import('../Navbar'), { ssr: false })

const Footer = dynamic(() => import('../Footer'), { ssr: false })

export default function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  const NAME = 'Totoro'
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Totoro | Kawaii social networking app</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2E3440" />
      </Head>
      <div className="overflow-x-hidden flex flex-col min-h-screen bg-nord6 dark:bg-nord1 justify-between">
        <header id="top ">
          <Nav name={NAME} />
        </header>
        <main className="content">
          <div>{children}</div>
        </main>
        <footer className="bg-white dark:bg-nord0 dark:text-white drop-shadow-sm w-full">
          <Footer name={NAME} />
        </footer>
      </div>
    </>
  )
}
