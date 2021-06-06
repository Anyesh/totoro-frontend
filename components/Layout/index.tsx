import dynamic from 'next/dynamic'
import React from 'react'

const Nav = dynamic(() => import('../Navbar'), { ssr: false })

const Footer = dynamic(() => import('../Footer'), { ssr: false })

export default function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  const NAME = 'Totoro'
  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen bg-nord6 dark:bg-nord1 justify-between">
      <header id="top">
        <Nav name={NAME} />
      </header>
      <main className="content">
        <div>{children}</div>
      </main>
      <footer className="bg-white dark:bg-nord0 dark:text-white drop-shadow-sm w-full ">
        <Footer name={NAME} />
      </footer>
    </div>
  )
}
