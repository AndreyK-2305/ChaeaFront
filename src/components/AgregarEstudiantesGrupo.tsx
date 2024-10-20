import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface Profesor {
  nombre: string;
  email: string;
}

interface Estudiante {
  nombre: string;
  email: string;
}

interface Grupo {
  id: number;
  nombre: string;
  profesor: Profesor;
  estudiantes: Estudiante[];
}

const AgregarEstudiantesGrupo: React.FC = () => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [selectedGrupo, setSelectedGrupo] = useState<number | null>(null);
  const [emails, setEmails] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8091/api/grupos')
      .then(response => {
        setGrupos(response.data);
      })
      .catch(error => {
        console.error('Error fetching grupos:', error);
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
    if (selectedGrupo === null) {
      alert('Por favor, selecciona un grupo.');
      return;
    }
    const emailsArray = emails.split(',').map(email => email.trim()).filter(email => email !== '');
    if (emailsArray.length === 0) {
      alert('No se encontraron correos de estudiantes válidos.');
      return;
    }
    axios.post(`http://localhost:8091/api/grupos/${selectedGrupo}/estudiantes`, emailsArray)
      .then(response => {
        alert('Estudiantes añadidos al grupo exitosamente.');
      })
      .catch(error => {
        console.error('Error agregando estudiantes al grupo:', error);
        alert('Error agregando estudiantes al grupo.');
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Estudiantes a Grupo</h1>
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
                {grupo.nombre} - Profesor: {grupo.profesor.nombre}
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
          Agregar Estudiantes
        </button>
      </form>
    </div>
  );
};

export default AgregarEstudiantesGrupo;