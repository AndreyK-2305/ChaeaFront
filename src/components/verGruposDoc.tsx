import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Estudiante {
  nombre: string;
  email: string;
}

interface Profesor {
  nombre: string;
  email: string;
}

interface Grupo {
  id: number;
  nombre: string;
  profesor: Profesor;
  estudiantes: Estudiante[];
}

const VerGruposDoc: React.FC = () => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8091/api/grupos')
      .then(response => {
        setGrupos(response.data);
      })
      .catch(error => {
        console.error('Error fetching grupos:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Grupos</h1>
      {grupos.length === 0 ? (
        <p>No hay grupos disponibles</p>
      ) : (
        <ul className="space-y-4">
          {grupos.map(grupo => (
            <li key={grupo.id} className="p-4 bg-white rounded shadow-md">
              <h2 className="text-xl font-semibold mb-2">{grupo.nombre}</h2>
              <p className="text-gray-700 mb-2">
                <strong>Profesor:</strong> {grupo.profesor.nombre} ({grupo.profesor.email})
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Estudiantes:</h3>
                {grupo.estudiantes.length === 0 ? (
                  <p>No hay estudiantes en este grupo</p>
                ) : (
                  <ul className="list-disc list-inside pl-4">
                    {grupo.estudiantes.map(estudiante => (
                      <li key={estudiante.email} className="text-gray-700">
                        {estudiante.nombre} ({estudiante.email})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VerGruposDoc;