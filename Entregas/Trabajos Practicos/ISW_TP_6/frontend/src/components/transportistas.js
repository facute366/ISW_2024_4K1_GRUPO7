import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ListadoTransportistas from './ListadoTransportistas';

const Transportistas = ({ cargaSeleccionada }) => {  // Recibe la carga seleccionada
  const { register, handleSubmit } = useForm();
  const [lista, setLista] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      const response = await axios.get('http://localhost:4000/api/Transportistas', {
        params: data.id
      });
      console.log(response.data);
      setLista(response.data);
    } catch (error) {
      setLista([
        {
          id: 1,
          nombre: "Transportista A",
          estrellas: 4.8,
          fechaDeRetiro: "2024-09-01",
          fechaEntrega: "2024-09-07",
          importe: 3500,
          formasDePago: ["efectivo", "tarjeta"],
        },
        {
          id: 2,
          nombre: "Transportista B",
          estrellas: 4.5,
          fechaDeRetiro: "2024-09-02",
          fechaEntrega: "2024-09-08",
          importe: 4200,
          formasDePago: ["efectivo", "tarjeta", "transferencia"],
        },
        {
          id: 3,
          nombre: "Transportista C",
          estrellas: 4.9,
          fechaDeRetiro: "2024-09-03",
          fechaEntrega: "2024-09-09",
          importe: 5000,
          formasDePago: ["efectivo", "transferencia"],
        },
        {
          id: 4,
          nombre: "Transportista D",
          estrellas: 4.3,
          fechaDeRetiro: "2024-09-05",
          fechaEntrega: "2024-09-10",
          importe: 3800,
          formasDePago: ["tarjeta", "transferencia"],
        },
        {
          id: 5,
          nombre: "Transportista E",
          estrellas: 4.7,
          fechaDeRetiro: "2024-09-06",
          fechaEntrega: "2024-09-12",
          importe: 4500,
          formasDePago: ["efectivo", "tarjeta", "transferencia"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Cotizaciones</h1>
      <hr />
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button type="submit" className="btn btn-primary">
              Buscar cotizaciones
            </button>
          </form>
        </div>
      </div>
      
      {/* Mostrar mensaje de "Cargando..." mientras loading es true */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando cotizaciones...</p>
        </div>
      )}
      
      {/* Mostrar listado de transportistas y pasar cargaSeleccionada */}
      {!loading && lista && (
        <ListadoTransportistas
          lista={lista}
          cargaSeleccionada={cargaSeleccionada} // Pasar la carga seleccionada
        />
      )}
    </div>
  );
};

export default Transportistas;
