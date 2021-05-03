import React from 'react'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Navbar'
import { LoginPage } from '../containers/LoginPage'

export default function index() {
  return (
    <div className="overflow-hidden">
      <Nav />

      <LoginPage />
      <Footer />
    </div>
  )
}
