import './App.css';
import Mensaje from './pages/mensajes/mensaje';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mensaje />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
