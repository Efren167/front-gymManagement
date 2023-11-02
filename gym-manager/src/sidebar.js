
import React from 'react';
import {  Link } from 'react-router-dom';
import './Estilos.css'; // Importa tu archivo CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/alta-usuario" className="btn">Alta Usuario</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;