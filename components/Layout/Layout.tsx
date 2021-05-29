import React from 'react'
import { Footer } from '../Footer'
import { Nav } from '../Navbar'

export default function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  const NAME = 'Totoro'
  return (
    <div className="overflow-hidden">
      <Nav name={NAME} />

      <div className="container w-screen max-w-full bg-nord6 dark:bg-nord1">{children}</div>
      <Footer name={NAME} />
    </div>
  )
}
