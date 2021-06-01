import React from 'react'
import { Footer } from '../Footer'
import { Nav } from '../Navbar'

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
