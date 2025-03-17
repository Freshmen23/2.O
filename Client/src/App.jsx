import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidenav from './components/Sidenav'
import ThemeToggle from './components/ThemeToggle'
import ProfCheck from './components/ProfCheck'

function App() {
  return (
    <>
      <Navbar/>
      <div className='flex'>
      <Sidenav/>
      <ProfCheck/>
      </div>
    </>
  )
}

export default App
