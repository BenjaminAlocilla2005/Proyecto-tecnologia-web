import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
      </Routes>

      <footer className="footer">
        <strong>VitrinaSur</strong>
        <p>Vitrina comercial territorial de Chiloé</p>
      </footer>
    </div>
  );
}

export default App;
