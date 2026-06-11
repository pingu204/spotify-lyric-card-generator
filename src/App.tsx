import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import Search from './components/Search'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col overflow-y-hidden h-svh">
        <Navbar />
        <Search />
        <div className="ticks"></div>
        <Footer />
    </div>
  )
}

export default App
