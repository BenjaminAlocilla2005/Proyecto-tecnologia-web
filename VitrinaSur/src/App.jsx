import { Routes, Route, Link } from "react-router-dom";
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
        <Route
          path="*"
          element={
            <main style={{ textAlign: "center", padding: "80px 20px" }}>
              <h1>Página no encontrada</h1>
              <p>La página que buscas no existe.</p>
              <Link to="/">Volver al inicio</Link>
            </main>
          }
        />
      </Routes>

      <footer className="footer">
        <strong>VitrinaSur</strong>
        <p>Vitrina comercial territorial de Chiloé</p>
      </footer>
    </div>
  );
}

export default App;
