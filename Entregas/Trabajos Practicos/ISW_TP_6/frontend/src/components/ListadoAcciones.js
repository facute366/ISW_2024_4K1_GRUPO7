import React from 'react';

const ListadoAcciones = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>IdAccion</th>
            <th>Denominacion</th>
            <th>Ranking</th>
            <th>Vigente</th>
            <th>Origen</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.IdAccion}>
              <td>{item.IdAccion}</td>
              <td>{item.Denominacion}</td>
              <td>{item.Ranking}</td>
              <td>{(item.Vigente) ? 'True' : 'False'}</td>
              <td>{item.Origen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoAcciones;
