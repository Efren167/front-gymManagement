import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ListadoClientes = () => {
  const [users, setUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Nuevo estado para el pop-up de éxito

  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/v0/subscribers')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const showDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowConfirmation(true);
  };

  const hideDeleteConfirmation = () => {
    setUserToDelete(null);
    setShowConfirmation(false);
  };

  const confirmDelete = () => {
    // Realiza la acción de borrado aquí usando el usuario almacenado en userToDelete
    // Luego, oculta el pop-up de confirmación
    // Asegúrate de actualizar el estado de users después del borrado si es necesario
    setUserToDelete(null);
    setShowConfirmation(false);

    // Muestra el pop-up de éxito
    setShowSuccess(true);
  };

  const hideSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4 text-center" style={{ color: 'lightgray' }}>
        Lista de Usuarios
      </h1>
      <table className="table table-striped mx-auto">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.dni}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link to={`/ver-usuario/${user.id}`}>
                    <button className="btn btn-success btn-sm rounded-pill">
                      Ver
                    </button>
                  </Link>
                  <Link to={`/editar-usuario/${user.id}`}>
                    <button className="btn btn-warning btn-sm rounded-pill">
                      Editar
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() => showDeleteConfirmation(user)}
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showConfirmation} onHide={hideDeleteConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Borrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea borrar al cliente?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Sí
          </Button>
          <Button variant="secondary" onClick={hideDeleteConfirmation}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pop-up de éxito */}
      <Modal show={showSuccess} onHide={hideSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          El usuario ha sido borrado.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={hideSuccess}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListadoClientes;
