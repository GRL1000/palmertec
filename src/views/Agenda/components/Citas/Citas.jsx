import React, { useEffect, useState } from "react";
import Buscar from '../../../../assets/icons/buscar.png';
import "./Citas.css";

function Citas() {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_paciente: "",
    id_personal: "",
    indicaciones: "",
    fecha: "",
    cotizacion: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCitaId, setEditCitaId] = useState(null);

  // Fetch data from API
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

  // Buscar citas
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCitas = citas.filter((cita) =>
    cita.fecha.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener nombre del paciente
  const getPacienteNombre = (pacienteId) => {
    const paciente = pacientes.find((p) => p.id_paciente === pacienteId);
    return paciente ? paciente.nombre : "No disponible";
  };

  // Obtener nombre del personal médico
  const getPersonalNombre = (personalId) => {
    const person = personal.find((p) => p.id_personal === personalId);
    return person ? person.nombre : "No disponible";
  };

  // Manejar cambios en el formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario para crear o editar una cita
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Combinar la fecha y la hora
    const fechaHora = `${formData.fecha}T${formData.hora}:00`;

    const citaData = {
      ...formData,
      fecha: fechaHora, // Aquí asignamos la fecha y hora combinada
    };

    try {
      const url = isEditMode
        ? `http://localhost:5000/api/cita/${editCitaId}`
        : "http://localhost:5000/api/cita";
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(citaData),
      });
      if (!response.ok)
        throw new Error(
          isEditMode ? "Error al editar cita" : "Error al guardar cita"
        );

      const newCita = await response.json();
      if (isEditMode) {
        setCitas(
          citas.map((cita) =>
            cita.id_cita === newCita.id_cita ? newCita : cita
          )
        );
      } else {
        setCitas([...citas, newCita]);
      }
      setIsModalOpen(false);
      setIsEditMode(false);
      setFormData({
        id_paciente: "",
        id_personal: "",
        indicaciones: "",
        fecha: "",
        hora: "", // Limpiar también el campo de hora
        cotizacion: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar la eliminación de una cita
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cita/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la cita");
      setCitas(citas.filter((cita) => cita.id_cita !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar la edición de una cita
  const handleEdit = (cita) => {
    setFormData({
      id_paciente: cita.id_paciente,
      id_personal: cita.id_personal,
      indicaciones: cita.indicaciones,
      fecha: cita.fecha,
      cotizacion: cita.cotizacion,
    });
    setEditCitaId(cita.id_cita);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="citas-container">
    <h2>Gestión de Citas Médicas</h2>
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por fecha..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
        <button className="search-button">
          <img src={Buscar} alt="Buscar" />
        </button>
      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        Registrar Nueva Cita
      </button>
    </div>

    {isModalOpen && (
      <div className="modal">
        <h3>{isEditMode ? "Editar Cita" : "Registrar Nueva Cita"}</h3>
        <form onSubmit={handleFormSubmit}>
          <select
            name="id_paciente"
            value={formData.id_paciente}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione Paciente</option>
            {pacientes.map(paciente => (
              <option key={paciente.id_paciente} value={paciente.id_paciente}>
                {paciente.nombre}
              </option>
            ))}
          </select>
          <select
            name="id_personal"
            value={formData.id_personal}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione Personal Médico</option>
            {personal.map(p => (
              <option key={p.id_personal} value={p.id_personal}>
                {p.nombre}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="indicaciones"
            placeholder="Indicaciones"
            value={formData.indicaciones}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
            required
          />
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="cotizacion"
            placeholder="Cotización"
            value={formData.cotizacion}
            onChange={handleInputChange}
            required
          />
          <button type="submit">
            {isEditMode ? "Actualizar" : "Guardar"}
          </button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </button>
        </form>
      </div>
    )}

    <table className="citas-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Paciente</th>
          <th>Personal Médico</th>
          <th>Fecha</th>
          <th>Indicaciones</th>
          <th>Cotización</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredCitas.length > 0 ? (
          filteredCitas.map((cita, index) => (
            <tr key={cita.id_cita}>
              <td>{index + 1}</td>
              <td>{getPacienteNombre(cita.id_paciente)}</td>
              <td>{getPersonalNombre(cita.id_personal)}</td>
              <td>
                {new Date(cita.fecha).toLocaleDateString("es-ES")} -{" "}
                {new Date(cita.fecha).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td>{cita.indicaciones}</td>
              <td>{cita.cotizacion}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(cita)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDelete(cita.id_cita)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No se encontraron citas.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
}

export default Citas;
