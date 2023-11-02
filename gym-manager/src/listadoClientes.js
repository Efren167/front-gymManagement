import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaEye, FaEdit } from 'react-icons/fa'; // Importa los iconos
import { FiTrash2 } from 'react-icons/fi';
import './Estilos.css';

const ListadoClientes = () => {
  const [users, setUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchDni, setSearchDni] = useState('');
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Obtener datos de usuarios
    fetch('http://localhost:8080/api/v0/subscribers')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error:', error));

    // Obtener datos de pagos
    fetch('http://localhost:8080/api/v0/payments')
      .then((response) => response.json())
      .then((data) => setPayments(data)) // Almacena los datos de pagos
      .catch((error) => console.error('Error:', error));
  }, []);

  const hasPaid = (userId) => {
    const payment = payments.find((payment) => payment.subscriberId === userId);
    return payment ? payment.invoiced : false;
  };

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

  const filteredUsers = users.filter((user) =>
    user.dni.startsWith(searchDni)
  );

  const dniNotFound = filteredUsers.length === 0 && searchDni !== '';

  return (
    <div className="container">
      <h1 className="mt-4 mb-4 text-center" style={{ color: 'lightgray' }}>
        Lista de Usuarios
      </h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por DNI (comienzo)"
          value={searchDni}
          onChange={(e) => setSearchDni(e.target.value)}
        />
      </div>
      <table className="table table-striped mx-auto">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.dni}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
              {hasPaid(user.id) ? (
    <button
      className="btn btn-success btn-sm rounded-pill"
      style={{ borderColor: 'green', backgroundColor: 'transparent', color: 'green', cursor: 'default' }}
    >
      Pagado
    </button>
  ) : (
    <button
      className="btn btn-danger btn-sm rounded-pill"
      style={{ borderColor: 'red', backgroundColor: 'transparent', color: 'red', cursor: 'default' }}
    >
      No Pagado
    </button>
  )}
              </td>
              <td>
                <div className="d-flex gap-2">
                <Link to={`/ver-usuario/${user.id}`}>
  <FaEye className="icon icon-success" style={{ color: 'green' }} />
</Link>
<Link to={`/editar-usuario/${user.id}`}>
  <FaEdit className="icon icon-warning" style={{ color: '#DAA520' }} />
</Link>

                  <button
  className="btn btn-danger btn-sm rounded-pill"
  style={{ backgroundColor: 'transparent', border: 'none' }}
  onClick={() => showDeleteConfirmation(user)}
>
  <FiTrash2 className="icon icon-danger" style={{ color: 'red' }} />
</button>


                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {dniNotFound && <p>DNI no encontrado</p>}

      <Modal show={showConfirmation} onHide={hideDeleteConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Borrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea dar de baja al cliente?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Sí
          </Button>
          <Button variant="secondary" onClick={hideDeleteConfirmation}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccess} onHide={hideSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>El cliente ha sido dado de baja correctamente.</Modal.Body>
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
