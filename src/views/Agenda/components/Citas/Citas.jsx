import React, { useEffect, useState } from "react";
import "./Citas.css";

function Citas() {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citasResponse, pacientesResponse, personalResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/citas"),
            fetch("http://localhost:5000/api/pacientes"),
            fetch("http://localhost:5000/api/personal-medico"),
          ]);

        if (
          !citasResponse.ok ||
          !pacientesResponse.ok ||
          !personalResponse.ok
        ) {
          throw new Error("Error en la respuesta de la API");
        }

        const citasData = await citasResponse.json();
        const pacientesData = await pacientesResponse.json();
        const personalData = await personalResponse.json();

        setCitas(citasData);
        setPacientes(pacientesData);
        setPersonal(personalData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar citas según el término de búsqueda
  const filteredCitas = citas.filter((cita) =>
    cita.fecha.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para obtener el nombre del paciente
  const getPacienteNombre = (pacienteId) => {
    console.log("Buscando paciente con ID:", pacienteId);
    const paciente = pacientes.find(p => p.id_paciente === pacienteId);
    return paciente ? paciente.nombre : "Desconocido";
  };
  
  const getPersonalNombre = (personalId) => {
    console.log("Buscando personal con ID:", personalId);
    const miembroPersonal = personal.find(p => p.id_personal === personalId);
    return miembroPersonal ? miembroPersonal.nombre : "Desconocido";
  };
  

  return (
    <div className="citas-container">
      <h2>Gestionar Citas</h2>
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
      <table className="citas-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Paciente</th>
            <th>Personal</th>
            <th>Indicaciones</th>
            <th>Fecha</th>
            <th>Cotización</th>
          </tr>
        </thead>
        <tbody>
          {filteredCitas.length > 0 ? (
            filteredCitas.map((cita, index) => (
              <tr key={cita.id_cita}>
                <td>{index + 1}</td>
                <td>{getPacienteNombre(cita.paciente_id)}</td>
                <td>{getPersonalNombre(cita.personal_id)}</td>
                <td>{cita.indicaciones}</td>
                <td>{cita.fecha}</td>
                <td>{cita.cotizacion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se encontraron citas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Citas;
