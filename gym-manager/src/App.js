import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerUsuario from './verUsuario';
import EditarUsuario from './editarUsuario';
import ListadoClientes from './listadoClientes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ver-usuario/:userId" element={<VerUsuario />} />
        <Route path="/editar-usuario/:userId" element={<EditarUsuario />} />
        <Route path="/" element={<ListadoClientes />} />
      </Routes>
    </Router>
  );
};

export default App;