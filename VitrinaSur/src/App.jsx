import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Productores from "./pages/Productores";
import Categorias from "./pages/Categorias";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productores" element={<Productores />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>

      <footer className="footer">
        <strong>VitrinaSur</strong>
        <p>Vitrina comercial territorial de Chiloé</p>
      </footer>
    </div>
  );
}

export default App;
