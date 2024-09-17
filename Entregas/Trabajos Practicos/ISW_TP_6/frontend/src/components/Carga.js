import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Carga = () => {
  const [lista, setLista] = useState([
    {
      id: 1,
      nombre: "Paquete A",
      peso: "5kg",
      ubicacion: "Almacén 3",
      fechaAlta: "2024-09-01",
      activo: true,
    },
    {
      id: 2,
      nombre: "Paquete B",
      peso: "2.5kg",
      ubicacion: "Almacén 1",
      fechaAlta: "2024-09-05",
      activo: true,
    },
    {
      id: 3,
      nombre: "Paquete C",
      peso: "3kg",
      ubicacion: "Almacén 2",
      fechaAlta: "2024-09-10",
      activo: false,
    },
    {
      id: 4,
      nombre: "Paquete D",
      peso: "7kg",
      ubicacion: "Almacén 4",
      fechaAlta: "2024-09-12",
      activo: true,
    },
    {
      id: 5,
      nombre: "Paquete E",
      peso: "1.5kg",
      ubicacion: "Almacén 5",
      fechaAlta: "2024-09-15",
      activo: false,
    },
  ]);

  const navigate = useNavigate();

  const handleRedirect = (cargaseleccionada) => {
    navigate('../transportistas', { state: cargaseleccionada });
  };

  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Peso</th>
            <th>Ubicación</th>
            <th>Fecha Alta</th>
            <th>Activo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.peso}</td>
              <td>{item.ubicacion}</td>
              <td>{item.fechaAlta}</td>
              <td>{item.activo ? 'True' : 'False'}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRedirect(item)}
                  className="btn btn-primary"
                >
                  Enviar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Carga;
