import React from 'react'
import Footer from './Footer'
// import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navigation from '../navigation/Navigation'

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout