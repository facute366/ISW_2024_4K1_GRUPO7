import './App.css';
import {Menu} from './components/Menu';
import { Inicio } from './components/Inicio';
import Transportistas from './components/transportistas';
import Carga from './components/Carga';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div>

      <BrowserRouter>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/Transportistas" element={<Transportistas />} />
              <Route path="/Carga" element={<Carga />} />
              <Route path="*" element={<Navigate to="/Carga" replace />} />
            </Routes>
          </div>
        </BrowserRouter>

    
    </div>
  );
}

export default App;
