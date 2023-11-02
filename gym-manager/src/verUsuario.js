import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const VerUsuario = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(null); // Inicializa access como null

  useEffect(() => {
    // Simulación de acceso denegado para este ejemplo.
    if (userId === 'denied') {
      setAccess(false); // Acceso denegado
    } else {
      // Realiza la solicitud para obtener la información del usuario.
      fetch(`http://localhost:8080/api/v0/subscriber/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          // Actualiza el estado de access con el valor de pago correspondiente
          fetch(`http://localhost:8080/api/v0/payments`)
            .then((response) => response.json())
            .then((payments) => {
              const payment = payments.find((payment) => payment.subscriberId === data.id);
              setAccess(payment ? payment.access : false);
            })
            .catch((error) => console.error('Error:', error));
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [userId]);

  return (
    <div className="container mt-4 text-center">
      <h1>Información del usuario</h1>
      {user ? (
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Nombre:</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Apellido:</th>
              <td>{user.surname}</td>
            </tr>
            <tr>
              <th>DNI:</th>
              <td>{user.dni}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Teléfono:</th>
              <td>{user.phone}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Cargando la información del usuario...</p>
      )}
      <div className="access-message">
        {access === true ? ( // Verificamos el estado de access
          <div className="alert alert-success" role="alert">
            Acceso permitido
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            Acceso denegado
          </div>
        )}
      </div>
      <Link to="/">
        <button className="btn btn-primary">
          Volver al Listado
        </button>
      </Link>
    </div>
  );
};

export default VerUsuario;
