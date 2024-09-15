import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import ListadoAcciones from './ListadoAcciones'

const Acciones = () => {
  const { register, handleSubmit } = useForm();
  
  const [lista, setLista] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:4000/api/acciones', {
        params: data
      });
      
      console.log(response.data)

      setLista(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
     <h1>Acciones</h1>
     <hr />
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Denominacion:</label>
              <input type="text" className="form-control" {...register('Denominacion')} />
            </div>
            <div className="mb-3">
              <label className="form-label">Region:</label>
              <input type="text" className="form-control" {...register('Region')} />
            </div>
            <div className="mb-3">
              <label className="mb-3">min:</label>
              <input type="text" className="form-control" {...register('min')} />
              <label className="mb-3">max:</label>
              <input type="text" className="form-control" {...register('max')} />
            </div>
            <div className="mb-3">
              <label className="form-label">Vigente:</label>
              <select className="form-select" {...register('Vigente')}>
                <option value="">Todos</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
      {lista && <ListadoAcciones lista={lista} />}
    </div>
  );
};

export default Acciones;
