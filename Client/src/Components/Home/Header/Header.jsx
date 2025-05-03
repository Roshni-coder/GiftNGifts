import React from 'react'
import TopStrip from './TopStrip/TopStrip'
import Navigation from './Navigations/Navigation'
import NavCategry from './Navigations/NavCategry'

function Header() {
  return (
    <header className='bg-white'>
      <TopStrip/>
      <Navigation/>
      <NavCategry/>
    </header>
  )
}

export default Header
