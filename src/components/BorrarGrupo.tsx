import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Estudiante {
  email: string;
}

interface Grupo {
  id: number;
  nombre: string;
  estudiantes: Estudiante[];
}

const BorrarGrupo: React.FC = () => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [selectedGrupo, setSelectedGrupo] = useState<number | null>(null);
  const [confirmacion, setConfirmacion] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8091/api/grupos')
      .then(response => {
        setGrupos(response.data);
      })
      .catch(error => {
        console.error('Error fetching grupos:', error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGrupo === null) {
      alert('Por favor, selecciona un grupo.');
      return;
    }

    const grupo = grupos.find(g => g.id === selectedGrupo);
    if (!grupo) {
      alert('Grupo no encontrado.');
      return;
    }

    if (confirmacion !== grupo.nombre) {
      alert(`Escribe el nombre del grupo (${grupo.nombre}) para confirmar.`);
      return;
    }

    axios.delete(`http://localhost:8091/api/grupos/${selectedGrupo}`)
      .then(response => {
        alert(`Grupo "${grupo.nombre}" eliminado exitosamente.`);
        // Actualiza la lista de grupos después de eliminar
        setGrupos(grupos.filter(g => g.id !== selectedGrupo));
        setSelectedGrupo(null);
        setConfirmacion('');
      })
      .catch(error => {
        console.error('Error eliminando el grupo:', error);
        alert('Error eliminando el grupo.');
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Borrar Grupo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Selecciona un Grupo:</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={selectedGrupo ?? ''}
            onChange={e => setSelectedGrupo(Number(e.target.value))}
          >
            <option value="" disabled>Selecciona un grupo</option>
            {grupos.map(grupo => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.nombre} - {grupo.estudiantes.length} estudiantes
              </option>
            ))}
          </select>
        </div>
        {selectedGrupo !== null && (
          <div className="mb-4">
            <label className="block text-gray-700">Confirma el nombre del grupo para borrar:</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={confirmacion}
              onChange={e => setConfirmacion(e.target.value)}
            />
          </div>
        )}
        <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded">
          Borrar Grupo
        </button>
      </form>
    </div>
  );
};

export default BorrarGrupo;