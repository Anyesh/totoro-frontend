import React from 'react'
import { Footer } from '../Footer'
import { Nav } from '../Navbar'

export default function Layout({ children }) {
  return (
    <div className="overflow-hidden">
      {Nav({ name: 'Totoro' })}

      {children}
      {Footer({ name: 'Totoro' })}
    </div>
  )
}
