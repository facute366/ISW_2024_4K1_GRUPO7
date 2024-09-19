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
          nombre: "Facundo Teggi",
          calificacion: 4.0,
          fechaDeRetiro: "01-10-2024",
          fechaEntrega: "07-10-2024",
          importe: 3500,
          formasDePago: ["Contado al retirar", "Tarjeta de Débito", "Tarjeta de Crédito"],
        },
        {
          id: 2,
          nombre: "Franco Belbruno",
          calificacion: 4.5,
          fechaDeRetiro: "02-10-2024",
          fechaEntrega: "08-10-2024",
          importe: 4200,
          formasDePago: ["Contado al retirar", "Tarjeta de Débito", "Tarjeta de Crédito", "Contado contra entrega"],
        },
        {
          id: 3,
          nombre: "Sofía Décimo",
          calificacion: 4.9,
          fechaDeRetiro: "03-10-2024",
          fechaEntrega: "09-10-2024",
          importe: 5000,
          formasDePago: ["Contado al retirar", "Contado contra entrega"],
        },
        {
          id: 4,
          nombre: "Tito Montivero",
          calificacion: 3.8,
          fechaDeRetiro: "05-10-2024",
          fechaEntrega: "10-10-2024",
          importe: 3800,
          formasDePago: ["Tarjeta de Débito", "Tarjeta de Crédito", "Contado contra entrega"],
        },
        {
          id: 5,
          nombre: "Tomás Sargentoni",
          calificacion: 4.7,
          fechaDeRetiro: "06-10-2024",
          fechaEntrega: "12-09-2024",
          importe: 4500,
          formasDePago: ["Contado al retirar", "Tarjeta de Débito", "Tarjeta de Crédito", "Contado contra entrega"],
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
