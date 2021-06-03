import dynamic from 'next/dynamic'
import React from 'react'

const Nav = dynamic(() => import('../Navbar'), { ssr: false })

const Footer = dynamic(() => import('../Footer'), { ssr: false })

export default function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  const NAME = 'Totoro'
  return (
    <div className="overflow-hidden flex flex-col h-screen justify-between bg-nord6 dark:bg-nord1">
      <header>
        <Nav name={NAME} />
      </header>
      <main>
        <div className="container max-w-full">{children}</div>
      </main>
      <Footer name={NAME} />
    </div>
  )
}
