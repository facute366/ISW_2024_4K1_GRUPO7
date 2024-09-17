import React, { useState } from 'react';

const ListadoTransportistas = ({ lista }) => {
  const [transportistaSeleccionado, setTransportistaSeleccionado] = useState(null);

  const handleSeleccionar = (transportista) => {
    setTransportistaSeleccionado(transportista);
  };

  const handleConfirmar = () => {
    alert(`Transportista ${transportistaSeleccionado.nombre} registrado correctamente.`);
    // Aquí podrías realizar alguna lógica adicional para el registro, como hacer una llamada API
  };

  return (
    <div>
      <h2>Listado de Transportistas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estrellas</th>
            <th>importe</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((transportista) => (
            <tr key={transportista.id} onClick={() => handleSeleccionar(transportista)}>
              <td>{transportista.id}</td>
              <td>{transportista.nombre}</td>
              <td>{transportista.estrellas}</td>
              <td>{transportista.importe}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {transportistaSeleccionado && (
        <div className="card mt-3">
          <div className="card-body">
            <h3>Detalles del Transportista Seleccionado</h3>
            <p><strong>ID:</strong> {transportistaSeleccionado.id}</p>
            <p><strong>Nombre:</strong> {transportistaSeleccionado.nombre}</p>
            <p><strong>Estrellas:</strong> {transportistaSeleccionado.estrellas}</p>
            <p><strong>Fecha de Retiro:</strong> {transportistaSeleccionado.fechaDeRetiro}</p>
            <p><strong>Fecha de Entrega:</strong> {transportistaSeleccionado.fechaEntrega}</p>
            <p><strong>Importe:</strong> {transportistaSeleccionado.importe}</p>
            <p><strong>Formas de Pago:</strong> {transportistaSeleccionado.formasDePago.join(', ')}</p>

            <button className="btn btn-success" onClick={handleConfirmar}>
              Confirmar Registro
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListadoTransportistas;
