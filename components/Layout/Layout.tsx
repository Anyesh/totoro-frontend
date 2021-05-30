import React from 'react'
import { Footer } from '../Footer'
import { Nav } from '../Navbar'

export default function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  const NAME = 'Totoro'
  return (
    <div className="overflow-hidden">
      <div className="bg-nord6 dark:bg-nord1">
        <Nav name={NAME} />

        <div className="container max-w-full mt-5 mb-5">{children}</div>
        <Footer name={NAME} />
      </div>
    </div>
  )
}
