import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface Profesor {
  email: string;
  nombre: string;
}

const crearGruposDoc: React.FC = () => {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [selectedProfesor, setSelectedProfesor] = useState<string | null>(null);
  const [nombreGrupo, setNombreGrupo] = useState<string>('');
  const [emails, setEmails] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8091/api/profesores')
      .then(response => {
        setProfesores(response.data);
      })
      .catch(error => {
        console.error('Error fetching profesores:', error);
      });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      Papa.parse(e.target.files[0], {
        complete: (result) => {
          const emailsArray = result.data.map((row: any) => row.email).filter((email: string) => email);
          setEmails(emailsArray.join(', '));
        },
        header: true
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfesor || !nombreGrupo) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const emailsArray = emails.split(',').map(email => email.trim()).filter(email => email !== '');
    const grupoDTO = {
      nombre: nombreGrupo,
      profesorEmail: selectedProfesor,
      correosEstudiantes: emailsArray.length > 0 ? emailsArray : null  // Permitir grupos sin estudiantes
    };
    axios.post('http://localhost:8091/api/grupos', grupoDTO)
      .then(response => {
        alert('Grupo creado exitosamente.');
      })
      .catch(error => {
        console.error('Error creando el grupo:', error);
        alert('Error creando el grupo.');
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Grupo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del Grupo:</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={nombreGrupo}
            onChange={e => setNombreGrupo(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Selecciona un Profesor:</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={selectedProfesor ?? ''}
            onChange={e => setSelectedProfesor(e.target.value)}
          >
            <option value="" disabled>Selecciona un profesor</option>
            {profesores.map(profesor => (
              <option key={profesor.email} value={profesor.email}>
                {profesor.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Correos de Estudiantes (separados por comas):</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={emails}
            onChange={e => setEmails(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Subir archivo CSV:</label>
          <input
            type="file"
            accept=".csv"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            onChange={handleFileUpload}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Crear Grupo
        </button>
      </form>
    </div>
  );
};

export default crearGruposDoc;
