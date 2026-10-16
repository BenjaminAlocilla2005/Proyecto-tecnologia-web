import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Categoria from './pages/Categoria'
import Productores from './pages/Productores'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categoria/:id" element={<Categoria />} />
        <Route path="/productores" element={<Productores />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App