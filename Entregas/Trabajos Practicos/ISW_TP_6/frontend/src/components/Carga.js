import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Carga = () => {
  const [lista, setLista] = useState([]);

  const navigate = useNavigate();

  // Cargar las cargas desde localStorage al montar el componente
  useEffect(() => {
    const cargasGuardadas = JSON.parse(localStorage.getItem('cargas'));

    // Si no hay cargas en localStorage, inicializar con la lista por defecto
    if (cargasGuardadas && cargasGuardadas.length > 0) {
      setLista(cargasGuardadas);
    } else {
      const listaInicial = [
        { id: 1, nombre: "Paquete A", peso: "5kg", ubicacion: "Almacén 3", fechaAlta: "01-09-2024", estado: "Registrado" },
        { id: 2, nombre: "Paquete B", peso: "2.5kg", ubicacion: "Almacén 1", fechaAlta: "05-09-2024", estado: "Registrado" },
        { id: 3, nombre: "Paquete C", peso: "3kg", ubicacion: "Almacén 2", fechaAlta: "10-09-2024", estado: "Registrado" },
        { id: 4, nombre: "Paquete D", peso: "7kg", ubicacion: "Almacén 4", fechaAlta: "12-09-2024", estado: "Registrado" },
        { id: 5, nombre: "Paquete E", peso: "1.5kg", ubicacion: "Almacén 5", fechaAlta: "15-09-2024", estado: "Registrado" },
      ];
      setLista(listaInicial);
      localStorage.setItem('cargas', JSON.stringify(listaInicial));
    }
  }, []);

  const handleRedirect = (cargaseleccionada) => {
    navigate('../transportistas', { state: { cargaSeleccionada: cargaseleccionada } });
  };
  

  return (
<div id="conteiner-tabla" className="container mt-3">
  <h2>Listado de Cargas</h2>
  {lista.length === 0 ? (
    <p>No hay cargas disponibles.</p>
  ) : (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Peso</th>
            <th>Ubicación</th>
            <th>Fecha Alta</th>
            <th>Estado</th>
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
              <td>{item.estado}</td>
              <td>
                {/* Mostrar el botón solo si el estado es "Registrado" */}
                {item.estado === "Registrado" && (
                  <button
                    type="button"
                    onClick={() => handleRedirect(item)}
                    className="btn btn-primary"
                  >
                    Ver cotizaciones
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default Carga;
