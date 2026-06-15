import './App.css'
import Navbar from './components/Navbar'
import Search from './components/Search'
import Footer from './components/Footer'

function App() {
  return (
    <div className="border-x border-x-gray-700 flex flex-col overflow-y-hidden h-svh">
        <Navbar />
        <Search />
        {/* <div className="ticks"></div> */}
        <Footer />
    </div>
  )
}

export default App
