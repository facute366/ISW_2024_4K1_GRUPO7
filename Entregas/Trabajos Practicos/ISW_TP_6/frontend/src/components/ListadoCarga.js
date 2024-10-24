import React from 'react';

const ListadoCarga = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Fecha Alta</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.IdArticulo}>
              <td>{item.Nombre}</td>
              <td>{item.Precio}</td>
              <td>{item.Stock}</td>
              <td>{item.FechaAlta}</td>
              <th>{item.estado}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoCarga;
