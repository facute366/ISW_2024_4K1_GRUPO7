import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { useForm } from '@formspree/react';
import { useLocation } from 'react-router-dom';


const ListadoTransportistas = ({ lista }) => {
  const location = useLocation();
  const [cargaSeleccionada, setCargaSeleccionada] = useState(null);

  useEffect(() => {
    if (location.state && location.state.cargaSeleccionada) {
      setCargaSeleccionada(location.state.cargaSeleccionada);
    }
  }, [location]);
  const [transportistaSeleccionado, setTransportistaSeleccionado] = useState(null);
  const [formaDePagoSeleccionada, setFormaDePagoSeleccionada] = useState('');

  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [pinTarjeta, setPinTarjeta] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('dni');
  const [numeroDocumento, setNumeroDocumento] = useState('');

  const [errores, setErrores] = useState({});
  
  // Recibir carga seleccionada como prop
  const [cargaActualizada, setCargaActualizada] = useState(cargaSeleccionada);

  // Configurar envío de correo con Formspree
  const [state, handleSubmit] = useForm("xovazbgd");

  const handleSeleccionar = (transportista) => {
    setTransportistaSeleccionado(transportista);
    setFormaDePagoSeleccionada(''); 
    setErrores({});
  };

  const handleFormaPagoChange = (event) => {
    setFormaDePagoSeleccionada(event.target.value);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
  
    if (formaDePagoSeleccionada === 'tarjeta') {
      if (!/^\d{13,18}$/.test(numeroTarjeta)) {
        nuevosErrores.numeroTarjeta = 'El número de tarjeta debe tener entre 13 y 18 dígitos.';
      } else if (numeroTarjeta.startsWith('10')) {
        // Mostrar alerta de tarjeta sin saldo usando SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Tarjeta rechazada',
          text: 'La tarjeta no tiene saldo suficiente.',
        });
        nuevosErrores.numeroTarjeta = 'La tarjeta no tiene saldo.';
      }
  
      if (!/^\d{1,4}$/.test(pinTarjeta)) {
        nuevosErrores.pinTarjeta = 'El PIN debe ser un número de hasta 4 dígitos.';
      }
  
      if (!/^[a-zA-Z\s]+$/.test(nombreTarjeta)) {
        nuevosErrores.nombreTarjeta = 'El nombre solo debe contener letras.';
      }
  
      if (tipoDocumento === 'dni') {
        if (!/^\d+$/.test(numeroDocumento)) {
          nuevosErrores.numeroDocumento = 'El DNI debe contener solo números.';
        }
      } else if (tipoDocumento === 'pasaporte') {
        if (!/^[a-zA-Z0-9]+$/.test(numeroDocumento)) {
          nuevosErrores.numeroDocumento = 'El pasaporte debe contener solo letras y números.';
        }
      }
    }
  
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  

  const handleConfirmar = async (e) => {
    e.preventDefault();
  
    // Verifica si cargaSeleccionada está definida
    if (!cargaSeleccionada || !cargaSeleccionada.id) {
      alert("No se ha seleccionado ninguna carga.");
      return;
    }
  
    if (!validarFormulario()) {
      return;
    }
  
    // Actualizar el estado de la carga a "confirmado"
    const cargaActualizada = {
      ...cargaSeleccionada,
      estado: 'confirmado',
    };
  
    // Actualizar en localStorage
    const cargasGuardadas = JSON.parse(localStorage.getItem('cargas')) || [];
    const nuevasCargas = cargasGuardadas.map((carga) =>
      carga.id === cargaSeleccionada.id ? cargaActualizada : carga
    );
    localStorage.setItem('cargas', JSON.stringify(nuevasCargas));
  
    // Mostrar la primera alerta de confirmación de cotización
    Swal.fire({
      icon: 'success',
      title: 'Cotización confirmada',
      html: `Se ha confirmado su cotización.<br><br>Forma de pago seleccionada: <strong>${formaDePagoSeleccionada}</strong>.`,
    }).then(() => {
      // Simular número de pago devuelto por la pasarela (número aleatorio de 9 dígitos)
      const numeroDePago = Math.floor(100000000 + Math.random() * 900000000);
  
      // Mostrar la segunda alerta con confirmación del pago y número de pago
      Swal.fire({
        icon: 'success',
        title: 'Pago procesado',
        html: `El pago se ha procesado correctamente.<br><br>
               Número de pago: <strong>${numeroDePago}</strong>.`,
      }); //Forma de pago seleccionada: <strong>${formaDePagoSeleccionada}</strong>.<br><br>
  
      // Enviar correo usando Formspree (solo con el mensaje básico)
    handleSubmit({
      email: "cliente@example.com", // Cambia este correo por el del cliente
      message: `
        La cotización ha sido aceptada.\n
        Forma de pago: ${formaDePagoSeleccionada}
      `,
      });
    });
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
            <th>Importe</th>
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
            
            <p><strong>Forma de Pago:</strong>
            <select value={formaDePagoSeleccionada} onChange={handleFormaPagoChange}>
              <option value="">Selecciona una forma de pago</option>
              {transportistaSeleccionado.formasDePago.map((forma, index) => (
                <option key={index} value={forma}>
                  {forma}
                </option>
              ))}
            </select></p>

            {formaDePagoSeleccionada === 'tarjeta' && (
              <div className="mt-3">
                <div>
                  <label>Número de Tarjeta:</label>
                  <input
                    type="text"
                    value={numeroTarjeta}
                    onChange={(e) => setNumeroTarjeta(e.target.value)}
                    placeholder="Número de tarjeta"
                  />
                  {errores.numeroTarjeta && <p className="text-danger">{errores.numeroTarjeta}</p>}
                </div>

                <div>
                  <label>PIN:</label>
                  <input
                    type="password"
                    value={pinTarjeta}
                    onChange={(e) => setPinTarjeta(e.target.value)}
                    placeholder="PIN"
                  />
                  {errores.pinTarjeta && <p className="text-danger">{errores.pinTarjeta}</p>}
                </div>

                <div>
                  <label>Nombre Completo:</label>
                  <input
                    type="text"
                    value={nombreTarjeta}
                    onChange={(e) => setNombreTarjeta(e.target.value)}
                    placeholder="Nombre completo"
                  />
                  {errores.nombreTarjeta && <p className="text-danger">{errores.nombreTarjeta}</p>}
                </div>

                <div>
                  <label>Tipo de Documento:</label>
                  <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                    <option value="dni">DNI</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div>
                  <label>Número de Documento:</label>
                  <input
                    type="text"
                    value={numeroDocumento}
                    onChange={(e) => setNumeroDocumento(e.target.value)}
                    placeholder="Número de documento"
                  />
                  {errores.numeroDocumento && <p className="text-danger">{errores.numeroDocumento}</p>}
                </div>
              </div>
            )}

            <form onSubmit={handleConfirmar}>
              <button type="submit" className="btn btn-success mt-3" disabled={!formaDePagoSeleccionada}>
                Confirmar y Enviar Correo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListadoTransportistas;