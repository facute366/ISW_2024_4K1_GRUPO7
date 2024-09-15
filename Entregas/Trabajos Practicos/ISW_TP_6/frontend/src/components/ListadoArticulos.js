import React from 'react';

const ListadoArticulos = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Fecha Alta</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.IdArticulo}>
              <td>{item.IdArticulo}</td>
              <td>{item.Nombre}</td>
              <td>{item.Precio}</td>
              <td>{item.Stock}</td>
              <td>{item.FechaAlta}</td>
              <td>{(item.Activo) ? 'True' : 'False'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoArticulos;
