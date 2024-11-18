// src/components/Recursos.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Importar el contexto de usuario

const Recursos = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [recursos, setRecursos] = useState([]);
  const { role } = useContext(UserContext); // Obtener el rol desde el contexto

  useEffect(() => {
    fetchRecursos();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/'))) {
      setFilePreview(URL.createObjectURL(selectedFile));
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('http://localhost:5000/api/recursos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Recurso creado');
      setTitle('');
      setDescription('');
      setFile(null);
      setFilePreview(null);
      fetchRecursos();
    } catch (error) {
      console.error('Error al crear recurso', error);
      alert('Error al crear recurso');
    }
  };

  const fetchRecursos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recursos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRecursos(response.data);
    } catch (error) {
      console.error('Error al obtener recursos', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recursos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Recurso eliminado');
      fetchRecursos();
    } catch (error) {
      console.error('Error al eliminar recurso', error);
      alert('Error al eliminar recurso');
    }
  };

  return (
    <div>
      <h1>Recursos</h1>

      {role === 'admin' && ( // Mostrar formulario solo si el rol es admin
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />

          {filePreview && (
            <div className="file-preview">
              {file && file.type.startsWith('image/') && (
                <img src={filePreview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              )}
              {file && file.type.startsWith('video/') && (
                <video controls style={{ maxWidth: '100%', maxHeight: '200px' }}>
                  <source src={filePreview} type={file.type} />
                  Tu navegador no soporta la vista previa de video.
                </video>
              )}
            </div>
          )}
          <button type="submit">Crear recurso</button>
        </form>
      )}

      <h2>Lista de recursos</h2>
      <ul>
        {recursos.map((recurso) => (
          <li key={recurso._id}>
            <h3>{recurso.title}</h3>
            <p>{recurso.description}</p>
            {recurso.fileUrl && (
              <div className="file-preview">
                {recurso.fileUrl.endsWith('.jpg') || recurso.fileUrl.endsWith('.png') || recurso.fileUrl.endsWith('.jpeg') ? (
                  <img src={`http://localhost:5000${recurso.fileUrl}`} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                ) : recurso.fileUrl.endsWith('.mp4') || recurso.fileUrl.endsWith('.mov') ? (
                  <video controls style={{ maxWidth: '100%', maxHeight: '200px' }}>
                    <source src={`http://localhost:5000${recurso.fileUrl}`} type="video/mp4" />
                    Tu navegador no soporta la vista previa de video.
                  </video>
                ) : (
                  <a href={`http://localhost:5000${recurso.fileUrl}`} target="_blank" rel="noopener noreferrer">
                    Descargar archivo
                  </a>
                )}
              </div>
            )}
            {role === 'admin' && (
              <button onClick={() => handleDelete(recurso._id)}>Eliminar recurso</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recursos;
