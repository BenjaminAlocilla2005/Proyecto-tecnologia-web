import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Productores from "./pages/Productores";
import Categorias from "./pages/Categorias";
import DetalleProducto from "./pages/DetalleProducto";
import Prepedido from "./pages/Prepedido";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productores" element={<Productores />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/prepedido/:id" element={<Prepedido />} />
      </Routes>

      <footer className="footer">
        <strong>VitrinaSur</strong>
        <p>Vitrina comercial territorial de Chiloé</p>
      </footer>
    </div>
  );
}

export default App;
