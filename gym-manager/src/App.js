
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListadoClientes from './listadoClientes';
import EditarUsuario from './editarUsuario';
import VerUsuario from './verUsuario';
import Sidebar from './sidebar';

import './Estilos.css';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/ver-usuario/:userId" element={<VerUsuario />} />
          <Route path="/editar-usuario/:userId" element={<EditarUsuario />} />
          <Route path="/" element={<ListadoClientes />} />
        </Routes>
    </div>
  </Router>
  );
};

export default App;

