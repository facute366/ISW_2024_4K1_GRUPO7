import React, { useState } from 'react';

const ListadoTransportistas = ({ lista }) => {
  const [transportistaSeleccionado, setTransportistaSeleccionado] = useState(null);
  const [formaDePagoSeleccionada, setFormaDePagoSeleccionada] = useState('');

  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [pinTarjeta, setPinTarjeta] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('dni');
  const [numeroDocumento, setNumeroDocumento] = useState('');

  const [errores, setErrores] = useState({});

  const handleSeleccionar = (transportista) => {
    setTransportistaSeleccionado(transportista);
    setFormaDePagoSeleccionada(''); // Reiniciar selección de forma de pago
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

  const handleConfirmar = () => {
    if (validarFormulario()) {
      if (formaDePagoSeleccionada === 'tarjeta') {
        alert(`Pago con tarjeta confirmado para el transportista ${transportistaSeleccionado.nombre}.`);
      } else {
        alert(`Transportista ${transportistaSeleccionado.nombre} registrado correctamente con forma de pago: ${formaDePagoSeleccionada}`);
      }
    }
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

            {/* Mostrar inputs adicionales si la forma de pago es "Tarjeta" */}
            {formaDePagoSeleccionada === 'tarjeta' && (
              <div className="mt-3">
                <div>
                  <label> <strong> Número de Tarjeta:</strong></label>
                  <input
                    type="text"
                    value={numeroTarjeta}
                    onChange={(e) => setNumeroTarjeta(e.target.value)}
                    placeholder="Número de tarjeta"
                  />
                  {errores.numeroTarjeta && <p style={{ color: 'red' }}>{errores.numeroTarjeta}</p>}
                </div>

                <div>
                  <label><strong>PIN:</strong></label>
                  <input
                    type="password"
                    value={pinTarjeta}
                    onChange={(e) => setPinTarjeta(e.target.value)}
                    placeholder="PIN"
                  />
                  {errores.pinTarjeta && <p style={{ color: 'red' }}>{errores.pinTarjeta}</p>}
                </div>

                <div>
                  <label><strong>Nombre Completo:</strong></label>
                  <input
                    type="text"
                    value={nombreTarjeta}
                    onChange={(e) => setNombreTarjeta(e.target.value)}
                    placeholder="Nombre completo"
                  />
                  {errores.nombreTarjeta && <p style={{ color: 'red' }}>{errores.nombreTarjeta}</p>}
                </div>

                <div>
                  <label><strong>Tipo de Documento:</strong></label>
                  <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                    <option value="dni">DNI</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div>
                  {/* Cambia el texto según el tipo de documento */}
                  <label>{tipoDocumento === 'dni' ? 'Número de Documento' : 'Número de Pasaporte'}:</label>
                  <input
                    type="text"
                    value={numeroDocumento}
                    onChange={(e) => setNumeroDocumento(e.target.value)}
                    placeholder={tipoDocumento === 'dni' ? 'Número de documento' : 'Número de pasaporte'}
                  />
                  {errores.numeroDocumento && <p style={{ color: 'red' }}>{errores.numeroDocumento}</p>}
                </div>
              </div>
            )}

            <button
              className="btn btn-success mt-3"
              onClick={handleConfirmar}
              disabled={!formaDePagoSeleccionada}
            >
              Confirmar Registro
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListadoTransportistas;