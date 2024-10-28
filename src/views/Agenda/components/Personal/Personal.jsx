import React, { useEffect, useState } from "react";
import "./Personal.css";

function Personal() {
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersonal = personal.filter((personal) =>
    personal.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <img src="ruta/a/icono-busqueda.png" alt="Buscar" />
        </button>
      </div>
      <table className="personal-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre completo</th>
            <th>Estado</th>
            <th>Alcaldía</th>
            <th>Especialidad</th>
            <th>Horas Laboradas</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersonal.length > 0 ? (
            filteredPersonal.map((personal, index) => (
              <tr key={personal.id_personal}>
                <td>{index + 1}</td>
                <td>{personal.nombre}</td>
                <td>{personal.estado}</td>
                <td>{personal.alcaldia}</td>
                <td>{personal.especialidad}</td>
                <td>{personal.horas_laboradas}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se encontraron pacientes.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Personal;
