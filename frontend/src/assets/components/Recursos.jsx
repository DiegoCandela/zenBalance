import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./styles/Recursos.css";

const Recursos = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [recursos, setRecursos] = useState([]);
  const { role, isAuthenticated } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Validar el estado de autenticación
    if (isAuthenticated === null) {
      console.log("Esperando autenticación...");
      return;
    }
    if (isAuthenticated === false) {
      console.log("Usuario no autenticado. Redirigiendo al login.");
      navigate("/login");
    } else {
      console.log("Usuario autenticado. Cargando recursos.");
      fetchRecursos();
    }
  }, [isAuthenticated, navigate]);

  const fetchRecursos = async () => {
    try {
      const response = await axios.get("https://zenbalance.onrender.com/api/recursos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRecursos(response.data);
    } catch (error) {
      console.error("Error al obtener recursos:", error);
      if (error.response?.status === 401) {
        console.error("Token inválido. Redirigiendo al login.");
        navigate("/login");
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (
      selectedFile &&
      (selectedFile.type.startsWith("image/") ||
        selectedFile.type.startsWith("video/"))
    ) {
      setFilePreview(URL.createObjectURL(selectedFile));
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("https://zenbalance.onrender.com/api/recursos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Recurso creado");
      setTitle("");
      setDescription("");
      setFile(null);
      setFilePreview(null);
      fetchRecursos();
    } catch (error) {
      console.error("Error al crear recurso:", error);
      alert("Error al crear recurso");
    }
  };

  const filterRecursos = (type) => {
    switch (type) {
      case "audio":
        return recursos.filter(
          (recurso) =>
            recurso.fileUrl?.endsWith(".mp3") ||
            recurso.fileUrl?.endsWith(".wav")
        );
      case "video":
        return recursos.filter(
          (recurso) =>
            recurso.fileUrl?.endsWith(".mp4") ||
            recurso.fileUrl?.endsWith(".mov")
        );
      case "document":
        return recursos.filter(
          (recurso) =>
            recurso.fileUrl?.endsWith(".pdf") ||
            recurso.fileUrl?.endsWith(".doc") ||
            recurso.fileUrl?.endsWith(".docx") ||
            recurso.fileUrl?.endsWith(".txt") ||
            recurso.fileUrl?.endsWith(".jpg") ||
            recurso.fileUrl?.endsWith(".jpeg") ||
            recurso.fileUrl?.endsWith(".png")
        );
      default:
        return recursos;
    }
  };

  // Mientras se valida la autenticación
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este recurso?")) return;
  
    try {
      await axios.delete(`https://zenbalance.onrender.com/api/recursos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Recurso eliminado correctamente");
      fetchRecursos(); // Actualiza la lista de recursos
    } catch (error) {
      console.error("Error al eliminar el recurso:", error);
      alert("Error al eliminar el recurso");
    }
  };
  

  return (
    <div className="recursos-container">
      <h1 className="recursos-title">Recursos</h1>
      {role === "admin" && (
        <form onSubmit={handleSubmit} className="recursos-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>

          {filePreview && (
            <div className="file-preview">
              {file && file.type.startsWith("image/") && (
                <img src={filePreview} alt="Vista previa" />
              )}
              {file && file.type.startsWith("video/") && (
                <video controls>
                  <source src={filePreview} type={file.type} />
                  Tu navegador no soporta la vista previa de video.
                </video>
              )}
            </div>
          )}
          <button type="submit" className="submit-button">
            Crear recurso
          </button>
        </form>
      )}
      <div className="recursos-tabs">
        <button
          className={`tab-button ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          Todos
        </button>
        <button
          className={`tab-button ${activeTab === "audio" ? "active" : ""}`}
          onClick={() => setActiveTab("audio")}
        >
          Audio
        </button>
        <button
          className={`tab-button ${activeTab === "video" ? "active" : ""}`}
          onClick={() => setActiveTab("video")}
        >
          Video
        </button>
        <button
          className={`tab-button ${activeTab === "document" ? "active" : ""}`}
          onClick={() => setActiveTab("document")}
        >
          Documentos
        </button>
      </div>
      <div className="recursos-list">
        {filterRecursos(activeTab).map((recurso) => (
          <div key={recurso._id} className="recurso-card">
            <h3 className="recurso-title">{recurso.title}</h3>
            <p className="recurso-description">{recurso.description}</p>
            {recurso.fileUrl && (
              <div className="recurso-preview">
                {recurso.fileUrl.endsWith(".mp4") ||
                recurso.fileUrl.endsWith(".mov") ? (
                  <div className="video-container">
                    <video controls>
                      <source
                        src={`https://zenbalance.onrender.com${recurso.fileUrl}`}
                        type="video/mp4"
                      />
                      Tu navegador no soporta la vista previa de video.
                    </video>
                  </div>
                ) : recurso.fileUrl.endsWith(".mp3") ||
                  recurso.fileUrl.endsWith(".wav") ? (
                  <div className="audio-container">
                    <audio controls>
                      <source src={`https://zenbalance.onrender.com${recurso.fileUrl}`} />
                      Tu navegador no soporta la reproducción de audio.
                    </audio>
                  </div>
                ) : recurso.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <div className="image-container">
                    <img
                      src={`https://zenbalance.onrender.com${recurso.fileUrl}`}
                      alt={recurso.title}
                      className="resource-image"
                    />
                  </div>
                ) : (
                  <div className="document-container">
                    <a
                      href={`https://zenbalance.onrender.com${recurso.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      Descargar archivo
                    </a>
                  </div>
                )}
              </div>
            )}
            {role === "admin" && (
              <button
                onClick={() => handleDelete(recurso._id)}
                className="delete-button"
              >
                Eliminar recurso
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recursos;
