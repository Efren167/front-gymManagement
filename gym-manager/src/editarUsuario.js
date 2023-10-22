import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditarUsuario = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde los parámetros de la URL
  const navigate = useNavigate();

  // Estado para almacenar los datos del usuario
  const [user, setUser] = useState({
    nombre: 'Juan',
    apellidos: 'Pérez',
    dni: '12345678',
    email: 'juan@example.com',
    telefono: '123-456-7890',
  });

  // Estado para mostrar el modal de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Estado para mostrar el modal de éxito
  const [showSuccess, setShowSuccess] = useState(false);

  // Función para abrir el modal de confirmación
  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  // Función para cerrar el modal de confirmación
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Función para actualizar los datos del usuario
  const handleUpdateUser = () => {
    // Simulación de solicitud PUT para actualizar los datos del usuario
    // Reemplaza esto con tu lógica de solicitud real

    // Cierra el modal de confirmación
    setShowConfirmation(false);

    // Muestra el modal de éxito
    setShowSuccess(true);
  };

  // Función para cerrar el modal de éxito
  const handleCloseSuccess = () => {
    // Redirige al usuario de vuelta al listado después de la actualización
    navigate('/');
  };

  // Función para cancelar la edición y volver al listado
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Editar Usuario</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={user.nombre}
            readOnly
            style={{ backgroundColor: '#f2f2f2' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellidos" className="form-label">
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            id="apellidos"
            name="apellidos"
            value={user.apellidos}
            readOnly
            style={{ backgroundColor: '#f2f2f2' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">
            DNI
          </label>
          <input
            type="text"
            className="form-control"
            id="dni"
            name="dni"
            value={user.dni}
            readOnly
            style={{ backgroundColor: '#f2f2f2' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="tel"
            className="form-control"
            id="telefono"
            name="telefono"
            value={user.telefono}
            onChange={(e) => setUser({ ...user, telefono: e.target.value })}
          />
        </div>
        <div className="text-center">
          <button onClick={handleConfirm} className="btn btn-primary me-2">
            Actualizar
          </button>
          <button onClick={handleGoBack} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal de confirmación */}
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Actualización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea actualizar los datos del usuario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateUser}>
            Aceptar
          </Button>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de éxito */}
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Los datos del usuario se han actualizado.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseSuccess}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditarUsuario;





