import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/footer'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation();

  const hideOnDashboard = location.pathname.startsWith('/dashboard')||location.pathname.startsWith('/signup')||location.pathname.startsWith('/login');

  return (
    <>
      {!hideOnDashboard && <Header />}

      <Outlet />

      {!hideOnDashboard && <Footer />}
    </>
  )
}

export default Layout;