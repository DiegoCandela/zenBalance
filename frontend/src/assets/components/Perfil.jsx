// Perfil.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Icon } from "@iconify/react";
import "./styles/Perfil.css";

const Perfil = () => {
  const { username, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [personalDescription, setPersonalDescription] = useState("");
  const [improvementDescription, setImprovementDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Mantener todas las funciones existentes igual
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No hay token, redirigiendo a login");
      navigate("/login");
    } else if (isAuthenticated) {
      fetchProfile();
      fetchTasks();
    }
  }, [isAuthenticated, navigate]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { age, personalDescription, improvementDescription } =
        response.data;
      setAge(age || "");
      setPersonalDescription(personalDescription || "");
      setImprovementDescription(improvementDescription || "");
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/tareas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/tareas",
        { task: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  const toggleCompleteTask = async (id, completed) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/tareas/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Error al marcar tarea como completada:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tareas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        { age, personalDescription, improvementDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setIsEditing(false);
    } catch (error) {
      setMessage("Error al actualizar el perfil");
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newTask.trim()) {
      addTask();
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <Icon icon="mdi:account-circle" className="avatar-icon" />
          </div>
          <div className="profile-title">
            <h1>Perfil de {username}</h1>
            {message && (
              <div
                className={`message ${
                  message.includes("Error") ? "error" : "success"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="age">Edad:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="personalDescription">Descripción Personal:</label>
            <textarea
              id="personalDescription"
              value={personalDescription}
              onChange={(e) => setPersonalDescription(e.target.value)}
              disabled={!isEditing}
              className="form-textarea"
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="improvementDescription">
              Cosas que quiero mejorar:
            </label>
            <textarea
              id="improvementDescription"
              value={improvementDescription}
              onChange={(e) => setImprovementDescription(e.target.value)}
              disabled={!isEditing}
              className="form-textarea"
              rows="4"
            ></textarea>
          </div>

          <div className="form-actions">
            {!isEditing ? (
              <button onClick={handleEdit} className="btn btn-primary">
                Editar Perfil
              </button>
            ) : (
              <button onClick={handleSave} className="btn btn-primary">
                Guardar Cambios
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="tasks-card">
        <h2>Mis Tareas</h2>
        <div className="tasks-add">
          <input
            type="text"
            placeholder="Nueva tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            className="form-input"
          />
          <button onClick={addTask} className="btn btn-primary">
            Agregar
          </button>
        </div>

        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-item">
              <span className={task.completed ? "completed" : ""}>
                {task.task}
              </span>
              <div className="task-actions">
                <button
                  onClick={() => toggleCompleteTask(task._id, task.completed)}
                  className="btn btn-secondary"
                >
                  {task.completed ? "Desmarcar" : "Completar"}
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Perfil;
