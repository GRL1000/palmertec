import React, { useEffect, useState } from "react";
import "./Personal.css";
import Buscar from '../../../../assets/icons/buscar.png';

function Personal() {
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_personal: null,
    nombre: "",
    email: "",
    estado: "",
    alcaldia: "",
    especialidad: "",
    horas_laboradas: 0,
    usuario_id: 2,
  });

  useEffect(() => {
    const fetchPersonal = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/personal-medico"
        );
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        const data = await response.json();
        setPersonal(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonal();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersonal = personal.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataWithUserId = { ...formData, usuario_id: 2 }; // Asegura que usuario_id esté definido

      const method = formDataWithUserId.id_personal ? "PUT" : "POST";
      const url = formDataWithUserId.id_personal
        ? `http://localhost:5000/api/personal/${formDataWithUserId.id_personal}`
        : "http://localhost:5000/api/personal";

      console.log("FormData antes de enviar:", formDataWithUserId); // Asegúrate de que usuario_id sea siempre 2

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithUserId),
      });
      if (!response.ok) {
        throw new Error("Error al guardar el personal");
      }
      const updatedPersonal = await response.json();
      if (method === "POST") {
        setPersonal([...personal, updatedPersonal]);
      } else {
        setPersonal(
          personal.map((p) =>
            p.id_personal === updatedPersonal.id_personal ? updatedPersonal : p
          )
        );
      }
      setIsModalOpen(false);
      setFormData({
        id_personal: null,
        nombre: "",
        email: "",
        estado: "",
        alcaldia: "",
        especialidad: "",
        horas_laboradas: 0,
        usuario_id: 2, // Reiniciar con usuario_id
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (personalToEdit) => {
    setFormData(personalToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/personal/${id}`, {
        method: "DELETE",
      });
      setPersonal(personal.filter((p) => p.id_personal !== id));
    } catch (error) {
      console.error("Error al eliminar personal:", error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="personal-container">
      <h2>Gestionar Personal</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button">
          <img src={Buscar} alt="Buscar" />
        </button>
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          Registrar Nuevo Personal
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <h3>
            {formData.id_personal
              ? "Editar Personal"
              : "Registrar Nuevo Personal"}
          </h3>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={formData.estado}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="alcaldia"
              placeholder="Alcaldía"
              value={formData.alcaldia}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="especialidad"
              placeholder="Especialidad"
              value={formData.especialidad}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="horas_laboradas"
              placeholder="Horas Laboradas"
              value={formData.horas_laboradas}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>
          </form>
        </div>
      )}

      <table className="personal-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre completo</th>
            <th>Estado</th>
            <th>Alcaldía</th>
            <th>Especialidad</th>
            <th>Horas Laboradas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersonal.length > 0 ? (
            filteredPersonal.map((p, index) => (
              <tr key={p.id_personal}>
                <td>{index + 1}</td>
                <td>{p.nombre}</td>
                <td>{p.estado}</td>
                <td>{p.alcaldia}</td>
                <td>{p.especialidad}</td>
                <td>{p.horas_laboradas}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(p)}>
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(p.id_personal)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No se encontraron personal.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Personal;
