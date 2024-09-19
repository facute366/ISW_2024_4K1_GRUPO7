import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { useForm } from '@formspree/react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';


const ListadoTransportistas = ({ lista }) => {
  const location = useLocation();
  const [cargaSeleccionada, setCargaSeleccionada] = useState(null);
  const navigate = useNavigate();

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
  
    if (formaDePagoSeleccionada === 'Tarjeta de Débito' || formaDePagoSeleccionada === 'Tarjeta de Crédito') {
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
      estado: 'Confirmado',
    };
  
    // Actualizar en localStorage
    const cargasGuardadas = JSON.parse(localStorage.getItem('cargas')) || [];
    const nuevasCargas = cargasGuardadas.map((carga) =>
      carga.id === cargaSeleccionada.id ? cargaActualizada : carga
    );
    localStorage.setItem('cargas', JSON.stringify(nuevasCargas));
  
    // Simular número de pago devuelto por la pasarela (número aleatorio de 9 dígitos)
    const numeroDePago = Math.floor(100000000 + Math.random() * 900000000);
  
    // Verificar si la forma de pago es con tarjeta antes de mostrar la alerta de pago procesado
    if (formaDePagoSeleccionada === 'Tarjeta de Débito' || formaDePagoSeleccionada === 'Tarjeta de Crédito') {
      // Mostrar la alerta de pago procesado
      Swal.fire({
        icon: 'success',
        title: 'Pago procesado',
        html: `El pago se ha procesado correctamente.<br><br>
               Número de pago: <strong>${numeroDePago}</strong>.`,
      }).then(() => {
        // Mostrar la alerta de cotización confirmada
        Swal.fire({
          icon: 'success',
          title: 'Cotización confirmada',
          html: `Se ha confirmado su cotización.<br><br>Forma de pago seleccionada: <strong>${formaDePagoSeleccionada}</strong>.`,
        }).then(() => {
          // Redirigir a la página de cargas
          navigate('/cargas');
        });
  
        // Enviar correo usando Formspree (solo con el mensaje básico)
        handleSubmit({
          email: "agustinaron8@gmail.com", // Agustín va a ser el cliente simulado
          message: `
            La cotización ha sido aceptada.\n
            Forma de pago: ${formaDePagoSeleccionada}
          `,
        });
      });
    } else {
      // Si no es tarjeta, solo mostrar la alerta de cotización confirmada
      Swal.fire({
        icon: 'success',
        title: 'Cotización confirmada',
        html: `Se ha confirmado su cotización.<br><br>Forma de pago seleccionada: <strong>${formaDePagoSeleccionada}</strong>.`,
      }).then(() => {
        // Redirigir a la página de cargas
        navigate('/cargas');
      });
  
      // Enviar correo usando Formspree
      handleSubmit({
        email: "agustinaron8@gmail.com", // Agustín va a ser el cliente simulado
        message: `
          La cotización ha sido aceptada.\n
          Forma de pago: ${formaDePagoSeleccionada}
        `,
      });
    }
  };
  
  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Estrellas llenas
    const halfStar = rating % 1 !== 0; // Estrella media si el rating no es un número entero
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Estrellas vacías

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Mostrar las estrellas */}
        {Array(fullStars).fill(0).map((_, i) => (
          <FontAwesomeIcon key={`full-${i}`} icon={faStar} style={{ color: '#FFD700' }} />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: '#FFD700' }} />}
        {Array(emptyStars).fill(0).map((_, i) => (
          <FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} style={{ color: '#D3D3D3' }} />
        ))}
        {/* Mostrar el número de la calificación */}
        <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{rating}</span>
      </div>
    );
  };
  


  return (
    <div>
      <h2>Listado de Cotizaciones</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre y Apellido</th>
            <th>Calificación</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((transportista) => (
            <tr id="transportista" key={transportista.id} onClick={() => handleSeleccionar(transportista)}>
              <td>{transportista.nombre}</td>
              <td>{renderStars(transportista.calificacion)}</td>
              <td>{transportista.importe}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {transportistaSeleccionado && (
        <div className="card mt-3">
          <div className="card-body">
            <h3>Detalles del Transportista Seleccionado</h3>
            <p><strong>Nombre y Apellido:</strong> {transportistaSeleccionado.nombre}</p>
            <td><strong>Calificación:</strong> {renderStars(transportistaSeleccionado.calificacion)}</td>
            <p><strong>Fecha de Retiro:</strong> {transportistaSeleccionado.fechaDeRetiro}</p>
            <p><strong>Fecha de Entrega:</strong> {transportistaSeleccionado.fechaEntrega}</p>
            <p><strong>Importe:</strong> {transportistaSeleccionado.importe}</p>
            
            <p><strong>Forma de Pago:  </strong>
            <select value={formaDePagoSeleccionada} onChange={handleFormaPagoChange}>
              <option value="">Selecciona una forma de pago</option>
              {transportistaSeleccionado.formasDePago.map((forma, index) => (
                <option key={index} value={forma}>
                  {forma}
                </option>
              ))}
            </select></p>

            {(formaDePagoSeleccionada === 'Tarjeta de Débito' || formaDePagoSeleccionada === 'Tarjeta de Crédito')  && (
              <div id='container-pago' className="mt-3">
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
                Confirmar cotización
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListadoTransportistas;
